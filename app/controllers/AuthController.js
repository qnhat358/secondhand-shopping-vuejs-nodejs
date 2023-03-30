const AuthService = require('../services/AuthService');


class AuthController {
  // [POST] /auth/login
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const { user, authTokens } = await AuthService.login(email, password);
      const { Password, ...others } = user;
      res.cookie("refreshToken", authTokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.responseSuccess({ user: { ...others }, accessToken: authTokens.accessToken });
    } catch (error) {
      res.responseError(error)
    }
  }

  // [POST] /auth/refresh
  async requestRefreshToken(req, res, next) {
    //TODO
    const refreshToken = req.cookies.refreshToken;
    // const refreshToken = req.get('cookie')?.slice(13);
    try {
      const authTokens = await AuthService.requestRefreshToken(refreshToken);
      res.cookie("refreshToken", authTokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.responseSuccess({ accessToken: authTokens.accessToken });
    } catch (error) {
      res.responseError(error);
    }
  }

  // [POST] /auth/logout
  async logout(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    try {
      await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.responseSuccess({}, "Logged out successfully!");
    } catch (error) {
      res.responseError(error);
    }
  }
}

module.exports = new AuthController();