const express = require('express');
const rateRouter = express.Router();
const RateCalculator = require('../rate-calculator/rateCalculator.js');
const {Validator} = require('express-json-validator-middleware');
const {validate} = new Validator();
const userInfoSchema = require('../rate-calculator/userInfoSchema.json');
const userInfoConverter = require('../rate-calculator/helpers.js');

rateRouter.get('/', (req, res) => {
    res.sendFile('/Users/elisafernandezvic/Desktop/CODING/FH_node/templates/ratecalcform.html');
})

rateRouter.post('/', validate({ body:userInfoSchema }), (req, res) => {
    const userInfo = userInfoConverter(req.body);
    console.log(userInfo);
    const calculator = new RateCalculator(userInfo);
    calculator.calculateGoalRate();
    const message = calculator.getFinalMessage();
    res.send(message);
})


module.exports = rateRouter;