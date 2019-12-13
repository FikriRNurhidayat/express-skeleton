var router = require('express').Router();
const controller = require('./controllers');
const responseHandler = require('./middlewares/responseHandler.js')
const Validator = require('fastest-validator');

for (let i in controller) {
  controller[i].forEach(c => {
    c.resources.forEach(r => {
      router[r.method.toLowerCase()](`/${i}` + c.namespace + r.path, function(req, res, next) {
        if (!r.params) return next();
        let request = new Validator();
        
        // Validate Body
        let body = {};
        let params = {};
        let query = {};

        for (let p in r.params) {
          if (r.params[p] == "date") {
            r.params[p] = new Date(Date.parse(req.body[p]))
          }
          switch(r.params[p].in) {
            case 'path':
              params[p] = r.params[p];
              break;

            case 'body':
              body[p] = r.params[p];
              break;

            case 'query':
              query[p] = r.params[p];
          }
        }

        body = request.validate(req.body, body)
        params = request.validate(req.params, params)
        query = request.validate(req.query, query)

        if (body == true && params == true && query == true) return next()

        let parameter = {
          body, query, params
        }

        let errors = {}
        for (let i in parameter) {
          if (parameter[i] != true) {
            errors[i] = parameter[i]
          }
        }

        return res.status(400).json({
          success: false,
          errors: errors
        })
      }, r.middlewares ? r.middlewares : [], r.handler, responseHandler)
    })
  })
}

module.exports = router;
