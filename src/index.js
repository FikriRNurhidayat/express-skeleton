const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json()); // Activate JSON body parser
app.use(express.urlencoded({
  extended: false
}));
app.use(morgan('dev'))

app.use('/api', require('./router.js'));
let exceptionHandler = require('./middlewares/exceptionHandler.js');
exceptionHandler.forEach(i => app.use(i));

module.exports = app;
