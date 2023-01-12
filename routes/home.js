const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.send('TO DO: render homepage for logged / unlogged users');
  })


module.exports = homeRouter;