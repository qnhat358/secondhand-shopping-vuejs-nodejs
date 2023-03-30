const ProductRepository = require('../repositories/ProductRepository');

class ProductService {
  // [GET] /Products/
  async index() {
    return await ProductRepository.index();
  }
}
module.exports = new ProductService();
  