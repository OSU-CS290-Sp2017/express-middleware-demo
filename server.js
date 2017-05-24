var path = require('path');
var express = require('express');
var logger = require('./lib/logger');
var app = express();
var port = process.env.PORT || 3000;

/*
 * This call to app.use() sets up our first middleware function.  Since this
 * is the first call to app.use, this will be the first thing called for every
 * request.
 */
app.use(function (req, res, next) {
  console.log("\n== For every request, this line will be printed first.");
  next();
});

/*
 * Any request handling function can be used as middleware, even one imported
 * from a module, like this one.
 */
app.use(logger);

/*
 * A middleware function can modify the request or response objects, like
 * this one does.
 */
app.use(function (req, res, next) {
  var now = new Date();
  req.requestTime = now.toString();
  next();
});

/*
 * This middleware function will only be called for HTTP GET requests for the
 * URL path '/'.  That's what app.get('/', ...) specifies.  There's no call to
 * next() because we are ending the request-response cycle here (with
 * req.send()).
 */
app.get('/', function (req, res) {

  var content = "<html>";
  content += "<body>";
  content += "<h1>Welcome to this page!</h1>";
  content += "<p>We hope you like it.</p>";
  content += "<p>You made this request at " + req.requestTime + "</p>";
  content += "</body>";
  content += "</html>";

  res.status(200);
  res.send(content);

});

/*
 * Here, we're using an Express built-in middleware to serve files from the
 * public/ directory statically.  In this case, these files will be available
 * out of the root URL path, e.g. public/index.html will be available at URL
 * path /index.html.
 */
app.use(express.static(path.join(__dirname, 'public')));

/*
 * This middleware function will be used on all HTTP POST requests.  That's
 * what app.post('*', specifies).
 */
app.post('*', function (req, res) {
  // Send a 405 status to indicate that POSTS aren't allowed.
  res.status(405);
  res.send("No POSTs allowed");
});

/*
 * This middleware function is an error handler.  If the app.get() function
 * above can't be applied (because the requested URL didn't match '/'), then
 * this function will be called and will send a 404 response.  If the user
 * requested URL '/', this middleware function will not be reached because
 * the middleware above will handle it (and end the request-response cycle)
 * first.
 */
app.get('*', function (req, res) {

  var content = "<html>";
  content += "<body>";
  content += "<h1>404 Error</h1>";
  content += "<p>We couldn't find the page you asked for: " + req.url + "</p>";
  content += "</body>";
  content += "</html>";

  res.status(404);
  res.send(content);

});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
