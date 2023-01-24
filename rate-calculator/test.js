const assert = require('assert');
//const { describe } = require('mocha');
const RateCalculator = require('./rateCalculator.js');

const calculator = new RateCalculator;

describe('Rate Calculator', () => {

    describe('Expenses', () => {

        it('Calculates annual impact of long-term expenses', () => {
            const expenses = {
                "long-term": [
                    {
                        price: 1500,
                        years: 5
                    },
                    {
                        price: 1000,
                        years: 10
                    }]
            };

            const annualExpenses = calculator.calculateAnnualExpenses(expenses);

            assert.equal(annualExpenses, 400)
        })

        it('Calculates annual impact of monthly expenses', () => {
            const expenses = {
                monthly: 100,
            };

            const annualExpenses = calculator.calculateAnnualExpenses(expenses);

            assert.equal(annualExpenses, 1200)
        })

        it('Aggregates long-term, annual and monthly expenses', () => {
            const expenses = {
                "long-term": [
                    {
                        price: 1500,
                        years: 5
                    },
                    {
                        price: 1000,
                        years: 10
                    }],
                yearly: 1000,
                monthly: 100
            };

            const annualExpenses = calculator.calculateAnnualExpenses(expenses);

            assert.equal(annualExpenses, 2600)
        })
    })

    describe('Billable hours', () => {
        it('Calculates net hours per day', () => {
            const hours = {
                'hours-day': 8,
                '%non-billable': 20,
            }

            const netHoursPerDay = calculator.calculateNetHoursDay(hours);

            assert.equal(netHoursPerDay, 6.4)
        })
    })
})