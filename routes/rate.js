const express = require('express');
const rateRouter = express.Router();
const RateCalculator = require('../rate-calculator/rateCalculator.js');

rateRouter.get('/', (req, res) => {
    res.send('TO DO: rate calculator form');
})

rateRouter.post('/', (req, res) => {
    const calculator = new RateCalculator(req.body);
    calculator.calculateGoalRate();
    const message = calculator.getFinalMessage();
    res.send(message);
})


module.exports = rateRouter;