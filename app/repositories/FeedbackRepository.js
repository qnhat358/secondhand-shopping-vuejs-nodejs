const DB = require('../../config/database.js');
class FeedbackRepository {
  async index() {
    return await DB.executeQuery("SELECT * FROM feedbacks");
  }
  async showRandom() {
    return await DB.executeQuery("SELECT users.UserName, feedbacks.Comment, feedbacks.Rating, feedbacks.Store FROM feedbacks INNER JOIN users ON feedbacks.UserID = users.UserID ORDER BY RAND() LIMIT 6");
  }
}
module.exports = new FeedbackRepository();
