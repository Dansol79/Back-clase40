import yargObj from '../../utils/yargs.js';
import logger from '../../utils/winston.js';
import productsDaoMongo from '../../daos/productsDao/productsDaoMongo.js';
const type = yargObj.persistence.toLowerCase();

class ProductDAOFactory{
    getDao(){
      if (type === 'MONGO'){
        return new productsDaoMongo()
      } else{
        logger.log('info', 'por ahora solo hay dao para Mongo')
        return new productsDaoMongo()
      }
    }
  }
  
  export default new ProductDAOFactory
  
  
  
  
  
  