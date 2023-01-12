const express = require('express');
const rateRouter = express.Router();

rateRouter.get('/', (req, res) => {
    res.send('TO DO: rate calculator');
})


module.exports = rateRouter;