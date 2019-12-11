function response(data) {
  return {
    success: false,
    errors: data
  }
}  

const telegram = require('./telegram.js');

module.exports = [
  function(req, res) {
    res.status(404).json(response("Are you lost?"))
  },
  function(err, req, res, next) {
    console.error(err);
    telegram.sendMessage(err);
    res.status(500).json(response("Something is broken!"))
  }
]
