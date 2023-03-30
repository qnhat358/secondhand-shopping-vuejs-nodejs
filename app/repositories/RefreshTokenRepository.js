const DB = require('../../config/database.js');
class RefreshTokenRepository {
  async create(token, userId) {
    const sql = "INSERT INTO RefreshTokens (Token, UserID) VALUES (?, ?)";
    return await DB.executeQuery(sql, [token, userId]);
  }
  async get(token) {
    const sql = "Select * FROM RefreshTokens WHERE Token = ?";
    return await DB.executeQuery(sql, [token]);
  }
  async delete(token) {
    const sql = "UPDATE RefreshTokens SET Blacklisted = 1 WHERE Token = ?";
    return await DB.executeQuery(sql, [token]);
  }
}
module.exports = new RefreshTokenRepository();
