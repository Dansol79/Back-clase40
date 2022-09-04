import User from '../userModel.js';

export default  async function isRegistered(req, res, next){
    const { email } = req.body;

    const exists = await User.find({ email: email });
    if (exists.length) {
      res.render('signup-UsuarioRegistrado');
      return;
    }
    next();
}