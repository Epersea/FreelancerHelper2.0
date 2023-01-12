const express = require('express');
const registerRouter = express.Router();

registerRouter.get('/', (req, res) => {
    res.send('TO DO: render register form');
})

registerRouter.post('/', (req, res) => {
    res.send('TO DO: register user');
})

module.exports = registerRouter;