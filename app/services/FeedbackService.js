const FeedbackRepository = require('../repositories/FeedbackRepository');

class FeedbackService {
  // [GET] /feedbacks/
  async index() {
    return await FeedbackRepository.index();
  }

  async showRandom() {
    return await FeedbackRepository.showRandom();
  }
}
module.exports = new FeedbackService();
