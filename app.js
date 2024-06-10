const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path'); // core node module for parsing file & dir paths

// Initialize app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB =
  'mongodb+srv://willwkhu:VqJaLHm0JrGFNVrQ@cluster0.jtd1fc6.mongodb.net/members_only?retryWrites=true&w=majority&appName=Cluster0';
//mongo user: coolUser
// pw: VqJaLHm0JrGFNVrQ
main().catch((err) => console.log('Oops! ', err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Set up express-session
const session = require('express-session');
const sessionConfig = {
  secret: 'tiger',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 5,
  },
};
app.use(session(sessionConfig));

// Log requests to console
app.use(logger('dev'));

// Parse req header cookies
// Adds req.cookies obj with cookies
// Instead of req.headers.cookie access w/ req.cookies
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.render('index');
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler - need to be last
app.use((err, req, res, next) => {
  // Set local variables
  res.locals.message = err.message;
  // Only provide err in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(3000, () => {
//   console.log('Beep Beep Boop.. Listening on port 3000');
// });

module.exports = app;
