import express from 'express';
import firebaseApp from './firebaseconfig.js'
import body_Parser from 'body-parser'

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



import users from './routes/users.js'
import uploads from './routes/uploads.js'
import view from './routes/view.js'





app.use('/users',users)
app.use('/uploads',uploads)
app.use('/view', view)

app.get('/',async(req,res)=>{
    res.send("Hello world")
})




app.listen(process.env.PORT||PORT,()=>{
    console.log("Server is up and running")
})