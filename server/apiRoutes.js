const express = require('express');

const movieRoutes = require('./movies/moviesRoutes');

const apiRouter = express.Router();

module.exports = () =>
    apiRouter
        .use('/movie', movieRoutes())