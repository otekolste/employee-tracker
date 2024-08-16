import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
    // Enter PostgreSQL username
    user: 'postgres',
    // Enter PostgreSQL password
    password: 'sAllL0v3now',
    host: 'localhost',
    database: 'employee_tracker_db'

})
 
export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}