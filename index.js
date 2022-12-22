import express from 'express';
import firebaseApp from './firebaseconfig.js'
import body_Parser from 'body-parser'
import { auth } from 'express-openid-connect';

const app = express();
const PORT = 5000


app.use(body_Parser.json());
app.use(body_Parser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,PATCH")
    next();
});

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:5000',
    clientID: 'BIOuZdKDSc3GLnmaz2YFVrSvibTbli4m',
    issuerBaseURL: 'https://dev-20go4hcq.us.auth0.com'
};

import users from './routes/users.js'
import uploads from './routes/uploads.js'





app.use('/users',users)
app.use('/uploads',uploads)
app.use(auth(config));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});




app.listen(process.env.PORT||PORT,()=>{
    console.log("Server is up and running")
})