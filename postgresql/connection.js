const { Sequelize, Model, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, './config.json'), 'utf-8'));

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.hostname,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/client_key.pem'), 'utf-8'),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/client_cert.pem'), 'utf-8'),
    },
  },
});