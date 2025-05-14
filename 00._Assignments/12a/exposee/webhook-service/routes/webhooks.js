// routes/webhooks.js
import express from 'express';
import axios from 'axios';
import { initDb } from '../db.js';

const router = express.Router();
const EVENT_TYPES = [
  'payment_received',
  'payment_processed',
  'invoice_processing',
  'invoice_completed'
];

// Helper to get DB
let dbPromise = initDb();

router.post('/register', async (req, res) => {
  const { url, event } = req.body;
  if (!url || !EVENT_TYPES.includes(event)) {
    return res.status(400).json({ error: 'Missing or invalid url/event' });
  }
  const db = await dbPromise;
  // Avoid exact duplicates
  await db.run(
    `INSERT OR IGNORE INTO webhooks (url, event_type) VALUES (?, ?)`,
    url, event
  );
  res.status(201).json({ success: true });
});

router.post('/unregister', async (req, res) => {
  const { url, event } = req.body;
  if (!url || !EVENT_TYPES.includes(event)) {
    return res.status(400).json({ error: 'Missing or invalid url/event' });
  }
  const db = await dbPromise;
  await db.run(
    `DELETE FROM webhooks WHERE url = ? AND event_type = ?`,
    url, event
  );
  res.json({ success: true });
});

router.post('/ping', async (req, res) => {
  const { event, payload = {} } = req.body;
  const db = await dbPromise;
  let rows;
  if (event) {
    if (!EVENT_TYPES.includes(event)) {
      return res.status(400).json({ error: 'Unknown event type' });
    }
    rows = await db.all(
      `SELECT url FROM webhooks WHERE event_type = ?`,
      event
    );
  } else {
    rows = await db.all(`SELECT url, event_type FROM webhooks`);
  }

  let successes = 0, failures = 0;
  const details = [];
  // Fire off each webhook
  await Promise.all(rows.map(async row => {
    const hookEvent = event || row.event_type;
    try {
      await axios.post(row.url, { event: hookEvent, payload });
      successes++;
      details.push({ url: row.url, status: 'ok' });
    } catch (e) {
      failures++;
      details.push({ url: row.url, status: 'error', error: e.message });
    }
  }));

  res.json({ successes, failures, details });
});

export default router;