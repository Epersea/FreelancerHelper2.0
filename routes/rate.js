const express = require('express');
const rateRouter = express.Router();
const RateCalculator = require('../rate-calculator/rateCalculator.js');
const {Validator} = require('express-json-validator-middleware');
const {validate} = new Validator();
const userInfoSchema = require('../rate-calculator/userInfoSchema.json')

rateRouter.get('/', (req, res) => {
    res.send('TO DO: rate calculator form');
})

rateRouter.post('/', validate({ body:userInfoSchema }), (req, res) => {
    /*try { 
        validate(req.body, userInfoSchema);
    } catch(error) { 
        res.status(401).end("Invalid body format: " + error.message); 
        return;
    }*/
    const calculator = new RateCalculator(req.body);
    calculator.calculateGoalRate();
    const message = calculator.getFinalMessage();
    res.send(message);
})


module.exports = rateRouter;