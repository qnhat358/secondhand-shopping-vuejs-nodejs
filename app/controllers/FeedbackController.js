const FeedbackService = require('../services/FeedbackService');
class FeedbackController {
  // [GET] /feedbacks/
  async index(req, res, next) {
    try {
      const feedbacks = await FeedbackService.index();
      res.responseSuccess(feedbacks);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [GET] /feedbacks/random
  async showRandom(req, res, next) {
    try {
      const feedbacks = await FeedbackService.showRandom();
      res.responseSuccess(feedbacks);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new FeedbackController();