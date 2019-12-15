var router = require('express').Router();
const controller = require('./controllers');
const responseHandler = require('./middlewares/responseHandler.js')
const Validator = require('fastest-validator');
const multer = require('multer');
const upload = multer();

function setForm(fields) {
  if (fields.length == 1) {
    return upload.single(fields[0].name)
  } else {
    return upload.fields(fields)
  }
}

for (let i in controller) {
  controller[i].forEach(c => {
    if (!c.resources) return;
    c.resources.forEach(r => {
      
      let isFormData = false;
      let formFields = []
      
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
            break;
          case 'formData':
            isFormData = true;
            let form = {
              name: p,
              max: r.params[p].max || 1
            }
            formFields.push(form)
        }
      }

      router[r.method.toLowerCase()](`/${i}` + c.namespace + r.path, function(req, res, next) {
        if (!r.params) return next();
        let request = new Validator();
        
        body = body != {} ? request.validate(req.body, body) : true
        params = params != {} ? request.validate(req.params, params) : true
        query = query != {} ? request.validate(req.query, query) : true

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
      }, isFormData ? setForm(formFields) : [],
        r.middlewares || [],
        r.handler,
        responseHandler
      )
    })
  })
}

module.exports = router;
