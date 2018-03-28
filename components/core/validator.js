const ErrorType = {
  SUCCESS: 'SUCCESS',
  STRING_VALIDATION_NO_ARGUMENT: '_isString did not get the argument',
  INVALID_STRING: 'Invalid String',
  USERNAME_MISSING: 'Username missing',
  PASSWORD_MISSING: 'Password missing',
  INVALID_USERNAME: 'Invalid username',
  USERNAME_DOES_NOT_EXISTS: 'Username does not exists',
  USERNAME_OR_PASSWORD_IS_INCORRECT: 'Username or Password is incorrect',
  USERNAME_RANGE_ERROR: 'Username range error',
  PASSWORD_RANGE_ERROR: 'Password range error',
  USERNAME_EXISTS: 'Username already exists',
  UNKNOWN_ERROR: 'unknown error',
}

class Validator {

  _isString(str) {
    console.log('_isString', str);
    if(!str) {
      console.log('no argument');
      return this.generateErrorMessage(ErrorType.STRING_VALIDATION_NO_ARGUMENT);
    }

    if(typeof str !== 'string') {
      console.log('invalid string');
      return this.generateErrorMessage(ErrorType.INVALID_STRING);
    }
    return this.ErrorType.SUCCESS;

  }

  generateErrorMessage(type, message) {
    let error_object = {
      type: type || ErrorType.UNKNOWN_ERROR,
      message: 'something went wrong'
    }

    switch(type) {
      case ErrorType.STRING_VALIDATION_NO_ARGUMENT:
      error_object.message = '_isString did not get the argument';
        break;
      case ErrorType.INVALID_STRING:
      error_object.message = 'Invalid String';
        break;
      case ErrorType.USERNAME_MISSING:
      error_object.message = 'Username missing';
        break;
      case ErrorType.PASSWORD_MISSING:
      error_object.message = 'Password missing';
        break;
      case ErrorType.INVALID_USERNAME:
      error_object.message = 'Invalid username';
        break;
      case ErrorType.USERNAME_DOES_NOT_EXISTS:
      error_object.message = 'Username does not exists';
        break;
      case ErrorType.USERNAME_OR_PASSWORD_IS_INCORRECT:
      error_object.message = 'Username or password is incorrect';
        break;
      case ErrorType.USERNAME_RANGE_ERROR:
      error_object.message = 'invalid username range';
        break;
      case ErrorType.PASSWORD_RANGE_ERROR:
      error_object.message = 'invalid password range';
        break;
      case ErrorType.USERNAME_EXISTS:
      error_object.message = 'username already exists';
        break;
      default:
    }
    console.log('generate error message error_object---', error_object);
    return error_object;
  }

}
module.exports = new Validator();
module.exports.ErrorType = ErrorType;
