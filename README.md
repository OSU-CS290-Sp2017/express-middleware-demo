# Express Middleware Demo Server

This repo contains a basic Express-based server in `server.js` that demonstrates some of the ways middleware can be used in Express.  Before doing anything with it you need to install dependencies:
```
npm install
```

Then, you can start the server:
```
npm start
```
This will start the server running on port 3000 by default.  You can change the port it runs on by setting the `PORT` environment variable.  Once the server is running, you can visit it at http://localhost:3000.

The server is also set up to handle (specifically to reject) HTTP POST requests.  You can test this, for example, in a Unix terminal, like this:
```
curl -X POST http://localhost:3000
```
