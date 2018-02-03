// Module dependency.
const dotEnv = require('dotenv');
const path = require('path');

const envName = process.env.envName || 'default';

// Application Environment files.
dotEnv.config({
  path: path.join(__dirname, `${envName}.env`),
});

// Application config goes here.
const config = {
  port: parseInt(process.env.SERVER_PORT, 10),
  host: process.env.HOST_NAME,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
};

module.exports = config;
