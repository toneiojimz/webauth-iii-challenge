  
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const apiRouter = require('./apiRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    return res.send('HERE WE ARE! /');
})

module.exports = server;