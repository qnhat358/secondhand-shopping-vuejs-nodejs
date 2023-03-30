const CategoryService = require('../services/CategoryService');
class CategoryController {
  // [GET] /Categories/
  async index(req, res, next) {
    try {
      const categories = await CategoryService.index();
      res.responseSuccess(categories);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new CategoryController();