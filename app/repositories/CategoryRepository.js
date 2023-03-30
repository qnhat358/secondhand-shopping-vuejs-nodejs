const DB = require('../../config/database.js');
class CategoryRepository {
  async index() {
    return await DB.executeQuery("SELECT * FROM productcategories");
  }
}
module.exports = new CategoryRepository();
