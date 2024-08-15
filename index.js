const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'sAllL0v3now',
    host: 'localhost',
    database: 'employee_tracker_db'
});