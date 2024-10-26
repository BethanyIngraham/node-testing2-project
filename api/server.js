const express = require('express');
const planetsRouter = require('./planets/planets-router');

const server = express();

server.use(express.json());

server.use('/api/planets', planetsRouter);

server.get('*', (req, res) => {
    res.json('testing endpoint');
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message 
        || 'something went wrong with the server',
        stack: err.stack
    })
});

module.exports = server;