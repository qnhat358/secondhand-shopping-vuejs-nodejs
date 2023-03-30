const ProductService = require('../services/ProductService');

class ProductController {
  // [GET] /Products/
  async index(req, res, next) {
    try {
      const products = await ProductService.index();
      res.responseSuccess(products)
    } catch (error) {
      res.responseError(error)
    }
  }
}
module.exports = new ProductController();