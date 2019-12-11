module.exports = function(req, res, next) {
  console.log("Hey, I'm middlewares");
  next();
}
