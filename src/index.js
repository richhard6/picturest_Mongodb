const { start } = require('./server');
const mongo = require('./config/mongo');
var path = require('path');
global.appRoot = path.resolve(__dirname);

start();
