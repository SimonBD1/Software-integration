import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fetch from 'node-fetch';

(async () => {
  // Initialize SQLite database
  const db = await open({ filename: 'webhooks.db', driver: sqlite3.Database });
  await db.run('PRAGMA journal_mode = WAL');
  await db.run(
    `CREATE TABLE IF NOT EXISTS webhooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      eventType TEXT NOT NULL,
      UNIQUE(url, eventType)
    )`
  );

  const EVENTS = [
    'PAYMENT_RECEIVED',
    'PAYMENT_PROCESSED',
    'INVOICE_PROCESSING',
    'INVOICE_COMPLETED',
  ];

  const app = express();
  app.use(express.json());

  /**
   * Register a webhook URL for one or more event types
   */
  app.post('/webhooks/register', async (req, res) => {
    const { url, eventTypes } = req.body || {};
    if (!url || !Array.isArray(eventTypes) || eventTypes.length === 0) {
      return res.status(400).json({ error: "'url' and non-empty 'eventTypes' are required" });
    }
    for (const evt of eventTypes) {
      if (!EVENTS.includes(evt)) {
        return res.status(400).json({ error: `Unknown event type: ${evt}` });
      }
      await db.run(
        'INSERT OR IGNORE INTO webhooks(url, eventType) VALUES (?, ?)',
        url,
        evt
      );
    }
    res.status(201).json({ success: true });
  });

  /**
   * Unregister a webhook URL from specified or all events
   */
  app.post('/webhooks/unregister', async (req, res) => {
    const { url, eventTypes } = req.body || {};
    if (!url) {
      return res.status(400).json({ error: "'url' is required" });
    }
    if (Array.isArray(eventTypes) && eventTypes.length > 0) {
      for (const evt of eventTypes) {
        await db.run('DELETE FROM webhooks WHERE url = ? AND eventType = ?', url, evt);
      }
    } else {
      // Remove URL from all events
      await db.run('DELETE FROM webhooks WHERE url = ?', url);
    }
    res.json({ success: true });
  });

  /**
   * Ping endpoint: triggers a test PING event to all registered URLs
   */
  app.post('/ping', async (_req, res) => {
    const rows = await db.all('SELECT DISTINCT url FROM webhooks');
    const payload = { event: 'PING', timestamp: new Date().toISOString() };
    const calls = rows.map(r =>
      fetch(r.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null)
    );
    await Promise.all(calls);
    res.json({ dispatched: rows.length });
  });

  /**
   * Dispatch a real event to subscribers
   */
  app.post('/events/:eventType', async (req, res) => {
    const { eventType } = req.params;
    if (!EVENTS.includes(eventType)) {
      return res.status(404).json({ error: 'Unknown event type' });
    }
    const rows = await db.all('SELECT DISTINCT url FROM webhooks WHERE eventType = ?', eventType);
    const payload = {
      event: eventType,
      data: req.body || {},
      timestamp: new Date().toISOString(),
    };
    const calls = rows.map(r =>
      fetch(r.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null)
    );
    await Promise.all(calls);
    res.json({ dispatched: rows.length });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Webhook Service listening on port ${PORT}`));
})();
