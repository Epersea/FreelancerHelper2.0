const assert = require('assert');
const mocha = require('mocha');
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
            };

            const netHoursPerDay = calculator.calculateNetHoursDay(hours);

            assert.equal(netHoursPerDay, 6.4)
        })

        it('Calculates days worked per year', () => {
            const hours = {
                'days-week': 5,
                holidays: 25,
                training: 5,
                sick: 8
            };

            const daysPerYear = calculator.calculateDaysPerYear(hours);

            assert.equal(daysPerYear, 222)
        })

        it('Calculates total billable hours', () => {
            const hours = {
                'hours-day': 8,
                '%non-billable': 20,
                'days-week': 5,
                holidays: 25,
                training: 5,
                sick: 8
            };

            const billableHours = calculator.calculateBillableHours(hours);

            assert.equal(billableHours, 1420.8);
        })

        it('Sends warning message if user works more than 10 hous per day', () => {
            const hours = {
                'hours-day': 10.5,
                '%non-billable': 20,
                'days-week': 5,
                holidays: 25,
                training: 5,
                sick: 8
            };

            const billableHours = calculator.calculateBillableHours(hours);
            
            const warningMessage = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!'
            assert.equal(billableHours, warningMessage);
        })

        it('Sends warning message if user does not take enough sick days', () => {
            const hours = {
                'hours-day': 9,
                '%non-billable': 20,
                'days-week': 5,
                holidays: 25,
                training: 5,
                sick: 2
            };

            const billableHours = calculator.calculateBillableHours(hours);
            
            const warningMessage = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!'
            assert.equal(billableHours, warningMessage);
        })
    })
})