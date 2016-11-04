/*
 * This file contains a simple Express middleware module to perform basic
 * request logging.
 */

module.exports = function (req, res, next) {
  console.log("== Got " + req.method + " request for:", req.url);
  next();
}
