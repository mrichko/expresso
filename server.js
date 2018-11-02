const express = require('express');

const app = express();
// add middleware for HTTP request logging
const morgan = require('morgan');
// Add middleware for handling CORS requests
const cors = require('cors');
// Add middleware to help handle errros
const errorHandler = require('errorhandler');

const sqlite3 = require('sqlite3');
const PORT = process.env.PORT || 4000;
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const apiRouter = require('./api/api');

app.use(errorHandler());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());
app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;
