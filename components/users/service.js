const UsersDAO = require('./private/dao');
const UserValidator = require('./private/validator');
const BaseValidator = require('./../core/validator');
const crypto = require('crypto');

class UsersService {

  getOneUser(query) {
    console.log('getOneUser == ', query);
    return new Promise((resolve, reject) => {
      return UsersDAO.getOneData(query).then((data) => {
        console.log('UsersServicei getOneData= ', data)
        resolve(data)
      }).catch((err) => {
        reject({
          err: 'error'
        })
      })
    })
  }

  getUsers(query, offset, limit) {
    console.log('getUser');
    return new Promise((resolve, reject) => {
      return UsersDAO.getData(query, offset, limit).then(data => {
        console.log('getUsers data', data)
        resolve(data)
      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  };

  insertUser(user, options) {
    console.log('insert', user);
    return new Promise((resolve, reject) => {
      options = options || {};
      let username_response = UserValidator.validateUsername(user.username);
      if (username_response !== BaseValidator.ErrorType.SUCCESS) {
        return reject(username_response)
      }

      let password_response = UserValidator.validatePassword(user.password);
      if (password_response !== BaseValidator.ErrorType.SUCCESS) {
        return reject(password_response)
      }

      let password = crypto.createHash('sha1').update(user.password + 'salt').digest('hex');
      user.password = password;
      this.getOneUser({username: user.username}).then((data) => {
        if (!data) {
           UsersDAO.insertData(user).then((data) => {
             return resolve(data);
          })
        } else {
          return reject(BaseValidator.generateErrorMessage(BaseValidator.ErrorType.USERNAME_EXISTS));
        }
      }).catch(err => {
        reject({
          err: 'err'
        })
      })
    })
  };

  signIn(user, options) {
    return new Promise((resolve, reject) => {
      options = options || {};

      let username_response = UserValidator.validateUsername(user.username);
      if (username_response !== BaseValidator.ErrorType.SUCCESS) {
        return reject(username_response);
      }

      let password_response = UserValidator.validatePassword(user.password);
      if (password_response !== BaseValidator.ErrorType.SUCCESS) {
        return reject(password_response);
      }
      this.getOneUser({username: user.username}).then((data) => {
        if(!data) {
          return reject(BaseValidator.ErrorType.USERNAME_DOES_NOT_EXISTS);
        }

        let password = crypto.createHash('sha1').update(user.password + 'salt').digest('hex');
        if (data.password !== password) {
          return reject(BaseValidator.ErrorType.USERNAME_OR_PASSWORD_IS_INCORRECT)
        }

        return resolve(data);
      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }

  deleteUser(id) {
    console.log('removeUser ==', id);
    return new Promise((resolve, reject) => {
      return UsersDAO.deleteData(id).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject({
          err: 'error'
        })
      })
    })
  };

}

module.exports = new UsersService();
