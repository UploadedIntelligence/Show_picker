import { Pool } from 'pg';

const ENV = process.env.PGDATABASE || 'development';

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE) {
    throw new Error('No PGDATABASE configured');
} else {
    console.log(`Connected to PGDATABASE ${process.env.PGDATABASE}`);
}

const pool = new Pool();

export default pool;
