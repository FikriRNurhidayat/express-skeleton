var resources = [
  {
    method: "POST",
    path: "/",
    handler: function(req, res, next) {
      req.body = [true, "This will be your response object", 200]
      next()
    }
  },
  {
    method: "GET",
    path: "/",
    handler: function(req, res, next) {
      req.body = [true, "This will be your response object", 200]
      next()
    }
  },
  {
    method: "PUT",
    path: "/edit",
    handler: function(req, res, next) {
      req.body = [true, "This will be your response object", 200]
      next()
    }
  }
]

module.exports = {
  namespace: "/test",
  resources
}