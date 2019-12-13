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
      req.body = [true, req.headers["x-some-key"], 200]
      next()
    }
  },
  {
    method: 'POST',
    path: '/',
    params: {
      image: {
        type: 'file',
        required: true,
        in: 'formData'
      }
    },
    handler: function(req, res, next) {
      console.log(req.file);
      req.body = [true, req.file.originalname, 200]
      next()
    }
  },
  {
    method: 'POST',
    path: '/multiple_file',
    params: {
      image: {
        type: 'file',
        required: true,
        in: 'formData'
      },
      photo: {
        type: 'file',
        required: true,
        in: 'formData'
      }
    },
    handler: function(req, res, next) {
      let filenames = {}
      // Please refers to Multer Documentation
      for (let i in req.files) {
        filenames[i] = req.files[i].map(i => i.originalname)
      }
      req.body = [true, filenames, 200]
      next()
    }
  }
]

module.exports = {
  namespace: '/examples',
  description: "All about examples",
  resources
} 
