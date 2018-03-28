const dbconnection = require('./../../core/dbConnection');
const BaseDAO = require('./../../core/baseDao');
const mongoose = require('mongoose');

require('./model');

let itemsCollection = dbconnection.model('items');

class ItemsDAO extends BaseDAO {
  constructor() {
    super(itemsCollection);
  }
}

module.exports = new ItemsDAO();
