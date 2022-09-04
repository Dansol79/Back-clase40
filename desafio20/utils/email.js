import { createTransport } from 'nodemailer';
import config from '../config/emailConfig.js';
import logger from './winston.js';

const TEST_EMAIL = 'Dolce@ethereal.email'    

const transporter = createTransport({
    host: config.MAIL_ETH_HOST,
    port: config.MAIL_ETH_PORT,
    auth: {
        user: config.MAIL_ETH_USER,
        pass: config.MAIL_ETH_PASS
    }
});

export async function singUpEmail(newUser){
    const mailOptions = {
          from:'Administradora DOLCE <Dolce@ethereal.email>',
          to: `${newUser.email}`,
          subject: "DOLCE: Confirmacion de cuenta",
          html: `
            <h1>Hola ${newUser.name}</h1> 
            <p>Gracias por registrarte en DOLCE</p>
            <p>EMAIL: ${newUser.email}</p>
            <p>Si no creaste esta cuenta puedes ignorar el mensaje</p>
            `
    };
        try{
            await transporter.sendMail(mailOptions);
        }catch(error){
            logger.error(`Error al enviar el email: ${error}`);
        }
    };

    export async function checkOutEmail(newOrder){
        const mailOptions = {
            from:'Administradora DOLCE <Dolce@ethereal.email>',
            to: TEST_EMAIL,
            subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
            html: `<h1>Pedido</h1>
            ${newOrder.products.map(x=>`<li>${x.products}, cantidad: ${x.quantity}</li>`)}
            `,
        }
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          logger.error(`Error al enviar mail de pedido. ${error}`)
        }
    }
