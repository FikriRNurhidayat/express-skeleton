module.exports = function(req, res) {
  let success = req.body[0]
  let data = req.body[1]
  let code = req.body[2]

  let response = {}
  response.success = success;
  response[`${success ? "data" : "errors"}`] = data;

  res.status(code).json(response)
}
