const express = require('express');
const rateRouter = express.Router();
const RateCalculator = require('../rate-calculator/rateCalculator.js');
const {Validator} = require('express-json-validator-middleware');
const {validate} = new Validator();
const userInfoSchema = require('../rate-calculator/userInfoSchema.json')

rateRouter.get('/', (req, res) => {
    res.sendFile('/Users/elisafernandezvic/Desktop/CODING/FH_node/templates/ratecalcform.html');
})

rateRouter.post('/', validate({ body:userInfoSchema }), (req, res) => {
    const calculator = new RateCalculator(req.body);
    calculator.calculateGoalRate();
    const message = calculator.getFinalMessage();
    res.send(message);
})


module.exports = rateRouter;