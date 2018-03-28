const dbconnection = require('./../../core/dbConnection');
const BaseDAO = require('./../../core/baseDao');
const mongoose = require('mongoose');

require('./model');

let usersCollection = dbconnection.model('users');

class UserDAO extends BaseDAO {

  constructor() {
    super(usersCollection);
  }

}

module.exports = new UserDAO();
