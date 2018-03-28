const dbconnection = require('./../../core/dbConnection');
const BaseDAO = require('./../../core/baseDao');
const mongoose = require('mongoose');

require('./model');

let photosCollection = dbconnection.model('photos');

class PhotosDAO extends BaseDAO {
  constructor() {
    super(photosCollection);
  }
}

module.exports = new PhotosDAO();
