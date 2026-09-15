// Import the MySQL library that allows the application
// to connect to and communicate with a MySQL database.
import mysql from 'mysql2/promise';

// Create a connection pool for the MySQL database.
// A connection pool allows multiple database queries
// to be handled efficiently without creating a new
// database connection for every request.
const pool = mysql.createPool({
  // Database server address
  host: process.env.DB_HOST,

  // MySQL username
  user: process.env.DB_USER,

  // MySQL password
  password: process.env.DB_PASSWORD,

  // Name of the database being used
  database: process.env.DB_NAME,

  // MySQL port number
  port: process.env.DB_PORT,
});

// Export the pool so that other files can use
// the database connection.
export default pool;