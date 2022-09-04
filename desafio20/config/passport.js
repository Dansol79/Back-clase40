import passport from "passport";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import User from '../components/users/userModel.js';

const customFields ={
    usernameField: 'email',
    passportField: 'password',
};

const verifiyCallback = async (email, password, done) => {
        try{
            const user = await User.findOne({email});
            if(!user){
                returndone(null, false)
            }

            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                return done(null, user);
            }else{
                return done(null, false);
            }
        }catch(error){
            done(error);
        }
}

const strategy = new LocalStrategy(customFields, verifiyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => {
        done(null, user);
    })
    .catch((error) => {
        done(error);
    })
});