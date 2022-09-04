import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import conectarDB from './config/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
import router from './routes/router.js';
// import logger from './utils/winston.js';
dotenv.config()

// Configuraciones generales
const app = express();
conectarDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Config Session
app.use(session({
    secret:'contraseña',
    cookie:{
        httpOnly:false,
        secure:false,
        maxAge: 600000 * 60,
    },
    resave:false,
    saveUninitialized:false,
    rolling:true,
})
);

// Autemtication de passport
import './config/passport.js';

app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(cors(`${process.env.PORT}`));
app.use(cookieParser());

// Rutas
router(app);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto principal')
})