const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
  // [GET] /Categorys/
  async index() {
    return await CategoryRepository.index();
  }
}
module.exports = new CategoryService();
