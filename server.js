require('dotenv').config()
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();


//Router
app.use('/api/files', require('./routes/files'));


app.listen(PORT,()=>{
     console.log(`Server listening on port: ${PORT}`)
})