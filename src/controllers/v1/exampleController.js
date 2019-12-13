let resources = [
  {
    method: 'GET',
    path: '/',
    params: {
      'X-Some-Key': {
        type: 'string',
        required: true,
        example: "Some Headers Value That You Might Need",
        in: 'header'
      }
    },
    handler: function(req, res, next) {
      let data = {
        message: 'This data is from Request Header',
        'X-Some-Key': req.headers["x-some-key"]
      }
      req.body = [true, data, 200]
      next()
    }
  }
]

module.exports = {
  namespace: '/examples',
  description: "All about examples",
  resources
} 
