require('dotenv').config()

const express = require('express');
const session = require("express-session");
const passport = require('./config/passport')
const path = require('path')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const connectDB = require("./config/db");
connectDB().then(()=>{
   app.listen(PORT,()=>{
     console.log(`Server listening on port: ${PORT}`)
})
});

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/api/files', require('./routes/files'));
app.use('/api/auth' , require('./routes/Auth'))
app.use('/files', require('./routes/show'));


