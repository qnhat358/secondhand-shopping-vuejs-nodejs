const UserRepository = require('../repositories/UserRepository');
const TokenService = require('./TokenService');
const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');
const { ForbiddenException } = require('../exceptions');
const { httpErrorTransform } = require('../../app/utils/httpCodes');

class AuthService {
  async login(email, password) {
    const user = await UserRepository.getUser(email, password);
    const authTokens = await TokenService.generateAuthTokens(user);
    return {
      user,
      authTokens
    }
  }

  async requestRefreshToken(token) {
    const tokenDB = await RefreshTokenRepository.get(token);
    if (!tokenDB.length) {
      throw new ForbiddenException(httpErrorTransform.forbiden);
    }
    const user = TokenService.verifyRefreshToken(token);
    await RefreshTokenRepository.delete(token);
    const authTokens = await TokenService.generateAuthTokens(user);
    return authTokens;
  }

  async logout(token) {
    await RefreshTokenRepository.delete(token);
  }
}

module.exports = new AuthService();
