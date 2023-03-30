const DB = require('../../config/database.js');
class ProductRepository {
  async index() {
    return await DB.executeQuery("SELECT * FROM products");
  }
}
module.exports = new ProductRepository();
