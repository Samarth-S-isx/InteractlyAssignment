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


// var mysqlConnection = mysql.createConnection({
//     host:process.env.SQL_HOST,
//     user:process.env.SQL_USER,
//     password:process.env.SQL_PASSWORD,
//     database:process.env.SQL_DB_NAME
// });

// mysqlConnection.connect((err)=>{
//     if(!err)console.log("DB Connected");
//     else console.log("DB unsuccessful\nError:",err);
// });
// module.exports = mysqlConnection.query

app.listen(3000,()=>{
    console.log("Server Up and running");
});

