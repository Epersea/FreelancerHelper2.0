const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
    res.send('TO DO: log user out');
})

module.exports = logoutRouter;