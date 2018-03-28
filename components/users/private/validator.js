const BaseValidator = require('./../../core/validator');
const AppConstants = require('./../../settings/constants');

class UserValidator {

  validateUsername(username) {

    if (!username) {
      return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.USERNAME_MISSING);
    }

    let username_reg_exp = /^\w+$/;
    if (!username_reg_exp.test(username)) {
      return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_USERNAME);
    }

    let check_username = BaseValidator._isString(username);
    if (check_username.type !== BaseValidator.ErrorType.SUCCESS) {
      return check_username;
    }

    if (username.length < AppConstants.USERNAME_MIN_LENGHT ||
        username.lenght > AppConstants.USERNAME_MAX_LENGHT) {
          return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.USERNAME_RANGE_ERROR);
        }
    return BaseValidator.ErrorType.SUCCESS;
  }

  validatePassword(password) {
    if (!password) {
      return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.PASSWORD_MISSING);
    }

    let check_password = BaseValidator._isString(password);
    if (check_password.type !== BaseValidator.ErrorType.SUCCESS) {
      return check_password;
    }

    if (password.length < AppConstants.PASSWORD_MIN_LENGTH ||
        password.length > AppConstants.PASSWORD_MAX_LENGHT) {
          return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.PASSWORD_RANGE_ERROR);
        }
    return BaseValidator.ErrorType.SUCCESS;
  }

}

module.exports = new UserValidator();
