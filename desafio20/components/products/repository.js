import logger from "../../utils/winston.js";

import productDaoFactory from '../../daos/productsDao/productDaoFactory.js';
const productsDao = productDaoFactory.getDao();

class ProductsRepository {
  async getAll() {
    return await productsDao.getAll();
  }
  async get(id) {
    return await productsDao.get(id);
  }
  async create(product) {
    return await productsDao.create(product);
  }
  async update(id, updatedProduct) {
    return await productsDao.update(id, updatedProduct);
  }
  async delete(id) {
    return await productsDao.delete(id);
  }
  async addProductToCart(productId, quantity, user){
    const productToAdd = {
      product: productId,
      quantity,
    };
    user.cart.push(productToAdd);
    user.save();

  }
}

export default new ProductsRepository();
