const express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const docs = require('./swagger.js')

app.use(express.json()); // Activate JSON body parser
app.use(express.urlencoded({
  extended: false
}));
app.use(morgan('dev'))

app.use('/api', require('./router.js'));
app.all('/', function(req, res) {
  res.status(200).json({
    success: true,
    data: {
      message: "Server Up!"
    }
  })
})

var docsOption = {
    customCssUrl: '/swagger.css',
    customJs: '/swagger.js'
}

app.use(express.static('public'))
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(docs, docsOption))
let exceptionHandler = require('./middlewares/exceptionHandler.js');
exceptionHandler.forEach(i => app.use(i));

module.exports = app;
