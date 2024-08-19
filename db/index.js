import pg from 'pg'
const { Pool } = pg

// Below code/structure referenced from https://node-postgres.com/guides/project-structure

 
const pool = new Pool({
    // Enter PostgreSQL username
    user: 'postgres',
    // Enter PostgreSQL password
    password: 'sAllL0v3now',
    host: 'localhost',
    database: 'employee_tracker_db'

})
 
export const query = async (text, params, callback) => {
  const res = await pool.query(text, params, callback)
  return res;
}

