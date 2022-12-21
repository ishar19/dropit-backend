import express from 'express';
const app = express();
const PORT = 5000

app.get('/',async(req,res)=>{
    res.send("Hello world")
})

app.listen(process.env.PORT||PORT,()=>{
    console.log("Server is up and running")
})