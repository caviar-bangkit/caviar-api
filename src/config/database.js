const mysql = require("promise-mysql");

const connection = async (config) => {
  return mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NAME,
    socketPath: process.env.INSTANCE_UNIX_SOCKET,
    ...config,
  });
};

module.exports = connection;
