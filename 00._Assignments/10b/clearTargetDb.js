import knex from 'knex';
import config from './knexfile.js';

// Initialize a Knex instance for the target database
const targetDb = knex(config.target);

async function clearTargetDb() {
  try {
    // 1) Fetch all tables in the public schema
    const tables = await targetDb
      .select('tablename')
      .from('pg_tables')
      .where({ schemaname: 'public' });

    if (tables.length === 0) {
      console.log('No tables found in target database.');
      return;
    }

    // 2) Build and execute a TRUNCATE statement for all tables
    const tableNames = tables.map(t => `"${t.tablename}"`).join(', ');
    await targetDb.raw(
      `TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`
    );

    console.log(
      `Cleared data from tables: ${tables.map(t => t.tablename).join(', ')}`
    );
  } catch (err) {
    console.error('Error clearing target database:', err);
  } finally {
    // 3) Destroy the Knex connection
    await targetDb.destroy();
  }
}

clearTargetDb();
