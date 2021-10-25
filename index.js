const express = require('express');
const app = express();

const routes = require('./routes.js')(app);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});