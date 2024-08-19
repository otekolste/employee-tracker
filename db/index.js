import pg from 'pg'
const { Pool } = pg
import 'dotenv/config'
// Below code/structure referenced from https://node-postgres.com/guides/project-structure

// Setting up connection pool + details
const pool = new Pool({
    // Enter PostgreSQL username
    user: process.env.DB_USER,
    // Enter PostgreSQL password
    password: process.env.DB_PW,
    host: 'localhost',
    database: 'employee_tracker_db'

})
 
// Function to query the database
export const query = async (text, params, callback) => {
  const res = await pool.query(text, params, callback)
  return res;
}

