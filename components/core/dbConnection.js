const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = mongoose.createConnection('127.0.0.1:27017/houseBackend');
