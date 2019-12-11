let justConsoleLog = require('../../middlewares/justConsoleLog.js');

let resources = [
  {
    method: 'POST',
    path: '/',
    middlewares: [justConsoleLog],
    params: {
      some: {
        type: 'string',
        required: true,
        example: "Sesuatu",
        in: 'body'
      },
      thing: {
        type: 'string',
        required: true,
        example: "Juga",
        in: 'body'
      }
    },
    handler: function(req, res, next) {
      req.body = [true, req.body, 200]
      next()
    }
  },
  {
    method: 'GET',
    path: '/',
    params: {
      some: {
        type: 'string',
        required: true,
        in: 'query'
      },
      thing: {
        type: 'string',
        required: true,
        in: 'query' 
      }
    },
    handler: function(req, res, next) {
      let data = {
        something: req.query.some + req.query.thing
      }

      req.body = [true, data, 200]
      next()
    }
  },
  {
    method: 'GET',
    path: '/:id',
    params: {
      id: {
        type: 'string',
        required: true,
        in: 'path'
      }    
    },
    handler: function(req, res, next) {
      req.body = [true, req.params, 200]
      next()
    }
  },
  {
    method: 'DELETE',
    path: '/error',
    description: 'This endpoint will trigger exception handler',
    handler: function(req, res, next) {
      SomeUndefinedMethod
    }
  },
  {
    method: 'PUT',
    path: '/',
    params: {
      _id: {
        type: 'string',
        required: true,
        in: 'query'
      },
      some: {
        type: 'string',
        required: true,
        in: 'body'  
      },
      thing: {
        type: 'number',
        required: true,
        in: 'body'  
      }
    },
    handler: function(req, res, next) {
      req.body.query = req.query
      req.body = [true, req.body, 200]
      next()
    }
  }
]

module.exports = {
  namespace: '/resources',
  description: "All about resources",
  resources
} 
