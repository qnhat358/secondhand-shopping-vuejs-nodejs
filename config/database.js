const mysql = require('mysql2/promise');
const {httpErrorTransform} = require('../app/utils/httpCodes');
const {InternalServerException} = require('../app/exceptions');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'secondhand_db',
  connectionLimit: 10,
});

const executeQuery = async (query, params = []) => {
  const conn = await pool.getConnection();
  try {
    const [rows, fields] = await conn.execute(query, params);
    return rows;
  } catch (error) {
    throw new InternalServerException(httpErrorTransform.query_error, error.message);
  } finally {
    conn.release();
  }
};

module.exports = {
  executeQuery,
};