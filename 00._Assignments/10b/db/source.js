import knex from 'knex';
import config from '../knexfile.js';
const sourceDb = knex(config.source);
export default sourceDb;