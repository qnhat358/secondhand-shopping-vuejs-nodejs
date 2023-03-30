const DB = require('../../config/database.js');
const {UnauthorizedException} = require('../exceptions')
const {httpErrorTransform} = require('../../app/utils/httpCodes')
class UserRepository {
  async index() {
    return await DB.executeQuery("SELECT * FROM users");
  }
  async getUser(email, password) {
    const user = await DB.executeQuery("SELECT * FROM users WHERE users.Email = ? AND users.Password = ?", [email, password]);
    //TODO: move to service
    if (!user.length) {
      throw new UnauthorizedException(httpErrorTransform.unauthorized, 'Incorrect email or password');
    }
    return user[0];
  }
  async getUserById(id) {
    const user = await DB.executeQuery("SELECT * FROM users WHERE users.UserID = ?", [id]);
    //TODO: move to service
    if (!user.length) {
      throw new UnauthorizedException(httpErrorTransform.unauthorized);
    }
    return user[0];
  }
}
module.exports = new UserRepository();
