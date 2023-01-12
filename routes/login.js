const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.send('TO DO: render login form / logged page');
})

loginRouter.post('/', (req, res) => {
    res.send('TO DO: log user in');
})

module.exports = loginRouter;