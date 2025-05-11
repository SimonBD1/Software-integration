import 'dotenv/config';

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  source: {
    client: 'postgresql',
    connection: {
      database: process.env.SOURCE_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host:     process.env.POSTGRES_HOST,
    }
  },
  target: {
    client: 'postgresql',
    connection: {
      database: process.env.TARGET_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host:     process.env.POSTGRES_HOST,
    }
  },
};