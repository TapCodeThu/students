const express = require('express')
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');


//config dotenv
dotenv.config()

//rest object

const app = express()

//middleware

app.use(express.json());


//routes

app.use('/api/v1/student',require('./routes/studentRoutes'));
app.get('/test', (req,res)=>{
    res.status(200).send('<h1>Hello</h1>')
})

//port
const PORT = process.env.PORT || 8000

//conditional listen
mySqlPool.query('SELECT 1').then(() =>{
    //MYSQL
    console.log("MySQL connected")

    //listen
    app.listen(PORT,() =>{
        console.log(`Server is running on port ${process.env.PORT}`)
});

}).catch((error)=>{
    console.log(error);
})


