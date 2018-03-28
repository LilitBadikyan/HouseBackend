const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const keygen = require('keygenerator');

function generateAPIKey() {
    return (keygen._({ length: 2 }) + '-' + keygen._({ length: 6 })
        + '-' + keygen.number()
        + '-' + keygen._({ length: 6 })
        + '-' + keygen._({ length: 8 })).replace(/&/g, '');
}

let UsersSchema = new Schema({
  key: {
      type: String,
      index: { unique: true },
      default: generateAPIKey
    },
  username: {
      type: String,
      index: {unique: true},
      lowercase: true,
    },
  password: {
      type: String,
    },
});

module.exports = mongoose.model('users', UsersSchema);
