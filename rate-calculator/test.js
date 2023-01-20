const assert = require('assert');
//const { describe } = require('mocha');
//const { it } = require('mocha');
const RateCalculator = require('./rateCalculator.js');

const calculator = new RateCalculator;

describe('Rate Calculator', () => {

    it('Calculates annual impact of long-term expenses', () => {
        const expenses = {
            "long-term" : [
                {
                    price: 1500,
                    years: 5
                },
                {
                    price: 1000,
                    years: 10
                }]
        }
        
        const annualExpenses = calculator.calculateAnnualExpenses(expenses);
        
        assert.equal(annualExpenses, 400)
    })
})