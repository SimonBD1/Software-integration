import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Admin connection to manage databases
const adminDb = knex({
  client: 'pg',
  connection: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: 'postgres',
  },
});

// Function to create a database if it doesn't exist
async function createDatabase(dbName) {
  const exists = await adminDb.raw(
    'SELECT 1 FROM pg_database WHERE datname = ?',
    [dbName]
  );
  if (exists.rows.length === 0) {
    await adminDb.raw(`CREATE DATABASE "${dbName}"`);
    console.log(`Created database: ${dbName}`);
  } else {
    console.log(`Database already exists: ${dbName}`);
  }
}

// Setup each database: drop existing users table, create fresh users table, and seed source database
async function setupSchema() {
  const sourceDb = knex({
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      database: process.env.SOURCE_DB,
    },
  });

  const targetDb = knex({
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      database: process.env.TARGET_DB,
    },
  });

  // Define schema creation for both databases
  for (const [db, dbName] of [[sourceDb, process.env.SOURCE_DB], [targetDb, process.env.TARGET_DB]]) {
    // Drop the table if it exists to ensure fresh schema
    await db.schema.dropTableIfExists('users');

    // Create a new users table
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.unique(['username', 'email']);
    });
    console.log(`Created fresh 'users' table in ${dbName}`);
  }

  // Seed dummy data into source database
  const dummy = [
    { username: 'alice', email: 'alice@example.com' },
    { username: 'bob',   email: 'bob@example.com' },
    { username: 'carol', email: 'carol@example.com' },
  ];

  await sourceDb('users').insert(dummy);
  console.log(`Inserted dummy data into ${process.env.SOURCE_DB}.users`);

  // Clean up connections
  await sourceDb.destroy();
  await targetDb.destroy();
}

// Main execution flow
async function main() {
  try {
    // Create databases if missing
    await createDatabase(process.env.SOURCE_DB);
    await createDatabase(process.env.TARGET_DB);

    // Setup schema and seed data
    await setupSchema();
  } catch (err) {
    console.error('Error setting up databases:', err);
  } finally {
    await adminDb.destroy();
  }
}

main();
