// import nodemailer from 'nodemailer'
// import jwt from "jsonwebtoken"
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config() 


// const transporter = nodemailer.createTransport({
//     host: 'smtp.mail.yahoo.com',
//     port: 465,
//     service: 'yahoo',
//     secure: false,
//     auth: {
//         user:" isharjain19@yahoo.com",
//         pass: 'myyahoopassword'
//     },
//     debug: false,
//     logger: true
// });

// console.log(transporter)

// const token = jwt.sign({
//     data: 'Token Data'
//     }, 'ourSecretKey', { expiresIn: '10m' }
// );

// const mailConfigurations = {

//     // It should be a string of sender/server email
//     from: "Ishar",

//     to: 'isharjain19@gmail.com',

//     // Subject of Email
//     subject: 'Email Verification',

//     // This would be the text of email body
//     text: `Hi! There, You have recently visited 
//            our website and entered your email.
//            Please follow the given link to verify your email
//            http://localhost:3000/verify/${token} 
//            Thanks`

// };

// transporter.sendMail(mailConfigurations, function (error, info) {
//     if (error) console.log(error);
//     console.log('Email Sent Successfully');
//     console.log(info);
// });

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import sgMail from '@sendgrid/mail'
sgMail.setApiKey("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"); 


const user_email = "bhavya.giri44@gmail.com"
// const msg = {
//     to: user_email,
//     from: 'isharjain19@gmail.com',
//     subject: 'Verification mail',
//     text: 'and easy to do anywhere, even with Node.js',
//     html:
//         `<p>Example<p>`,
// };

const msg = {
    to: 'lordcero7@gmail.com', // Change to your recipient
    from: 'isharjain19@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
    })
    .catch((error) => {
        console.error(error)
    })
 await sgMail.send(msg).then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
});

