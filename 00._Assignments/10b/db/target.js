import knex from 'knex';
import config from '../knexfile.js';
const targetDb = knex(config.target);
export default targetDb;