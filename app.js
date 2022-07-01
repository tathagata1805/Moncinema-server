const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//get images from /images folder
app.use('/images', express.static('images')); 

const mongoose = require('mongoose');

// ROUTES
const userRoutes = require('./routes/user');
const moviesRoutes = require('./routes/movies');
const commentRoutes = require('./routes/comment');


mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true})
  .then(() => console.log('MongoDB successfully connected!'))
  .catch(() => console.log('There was en error connecting MongoDB!'))


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // A remplacer par ce qui est en commentaire plus haut
  res.setHeader('Access-Control-Request-Method', 'POST');
  res.setHeader('Access-Control-Allow-Methods', 'POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*'); // A remplacer par res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept");
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload'); // look this article https://www.tunetheweb.com/blog/dangerous-web-security-features/
  res.setHeader('X-XSS-Protection','1;mode=block');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Type', 'application/json');
  next();
});


app.use('/users', userRoutes);
app.use('/movies', moviesRoutes);
app.use('/comment', commentRoutes);

module.exports = app;


