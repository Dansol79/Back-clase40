import users from "../components/users/userRouter.js";
import carts from '../components/carts/cartRouter.js';
import products from '../components/products/productRouter.js';
import orders from '../components/orders/orderRouter.js';
import {isAuth} from '../utils/Auth.js';
import Products from '../components/products/productsModel.js';
import productsForIndexDTO from "../components/products/DOTs/productsForIndexDOT.js";
import logger from "../utils/winston.js"



export default (app) => {
    products(app);
    carts(app);
    app.use(users);
    app.use(orders);

    
  app.get('/', isAuth, async(req, res) => {
    const user = req.user
    try {
      const products = await Products.find({});
      const productsDTO = products.map(product => new productsForIndexDTO(product))
      res.render('index', { user, productsDTO })
    } catch (error) {
      logger.error(`Error al listar productos. ${error}`);
    }


  });

  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
}
