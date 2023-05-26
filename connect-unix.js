const mysql = require("promise-mysql");

// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL.
const createUnixSocketPool = async (config) => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  return mysql.createPool({
    user: root, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: caviardb, // e.g. 'my-database'
    socketPath: "/cloudsql/caviar-api-387910:asia-southeast2:caviardb", // e.g. '/cloudsql/project:region:instance'
    // Specify additional properties here.
    ...config,
  });
};
