const express = require('express');
const summaryRouter = express.Router();

summaryRouter.get('/', (req, res) => {
    res.send('TO DO: display summary');
})

module.exports = summaryRouter;