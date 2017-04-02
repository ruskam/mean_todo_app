// get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// set up API routes

const api = require('./server/routes/api');

// set up an app variable
const app = express();

// set up Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// set up a static path to dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// set up api routes
app.use('/api', api);

// catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, dist/index.html));
    //res.sendfile(path.join(__dirname, index.html));
});

// set a port
const port = process.env.PORT || '3000';
app.set('port', port);

// create HTTP server
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`familytasks app runnig on localhost:${port}`);
});
