const express=require('express');
const app=express();
const dotenv=require('dotenv');
const contactRoutes = require('./routes/contactRoutes')


dotenv.config();
app.use(express.json());

app.use('/contacts',contactRoutes)

app.use((req,res,next)=>{
    const error = new Error('Could not find the url');
    error.code= 404
    throw error
})
app.listen(3000,()=>{
    console.log("Server Up and running");
});

