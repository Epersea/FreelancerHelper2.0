const assert = require('assert');
const mocha = require('mocha');
const RateCalculator = require('./rateCalculator.js');
const Expenses = require('./expenses.js');
const BillableHours = require('./billableHours.js')
const Earnings = require('./earnings.js')

describe('Rate Calculator', () => {

    describe('Expenses', () => {

        it('Calculates annual impact of long-term expenses', () => {
            const userInfo = {
                expenses : {
                    "long-term": [
                        {
                            price: 1500,
                            years: 5
                        },
                        {
                            price: 1000,
                            years: 10
                        }]
                }    
            };

            const annualExpenses = Expenses.calculateAnnualExpenses(userInfo.expenses);

            assert.equal(annualExpenses, 400)
        })

        it('Calculates annual impact of monthly expenses', () => {
            const userInfo = {
                expenses : {
                    monthly: 100,
                }
            };

            const annualExpenses = Expenses.calculateAnnualExpenses(userInfo.expenses);

            assert.equal(annualExpenses, 1200)
        })

        it('Aggregates long-term, annual and monthly expenses', () => {
            const userInfo = {
                expenses : {
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
                }
            };

            const annualExpenses = Expenses.calculateAnnualExpenses(userInfo.expenses);

            assert.equal(annualExpenses, 2600)
        })
    })

    describe('Billable hours', () => {

        it('Calculates net hours per day', () => {
            const userInfo = {
                hours : {
                    'hours-day': 8,
                    '%non-billable': 20,
                }
            };

            const netHoursPerDay = BillableHours.calculateNetHoursDay(userInfo.hours);

            assert.equal(netHoursPerDay, 6.4)
        })

        it('Calculates days worked per year', () => {
            const userInfo = {
                hours : {
                    'days-week': 5,
                    holidays: 25,
                    training: 5,
                    sick: 8
                }
            };

            const daysPerYear = BillableHours.calculateDaysPerYear(userInfo.hours);

            assert.equal(daysPerYear, 222)
        })

        it('Calculates total billable hours', () => {
            const userInfo = {
                hours : {
                    'hours-day': 8,
                    '%non-billable': 20,
                    'days-week': 5,
                    holidays: 25,
                    training: 5,
                    sick: 8
                }
            };

            const billableHours = BillableHours.calculateBillableHours(userInfo.hours);

            assert.equal(billableHours, 1420.8);
        })

        it('Sends warning message if user works more than 10 hous per day', () => {
            const userInfo = {
                hours : {
                    'hours-day': 10.5,
                    '%non-billable': 20,
                    'days-week': 5,
                    holidays: 25,
                    training: 5,
                    sick: 8
                }
            };

            const billableHours = BillableHours.calculateBillableHours(userInfo.hours);

            const warningMessage = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!'
            assert.equal(billableHours, warningMessage);
        })

        it('Sends warning message if user does not take enough sick days', () => {
            const userInfo = {
                hours : {
                    'hours-day': 9,
                    '%non-billable': 20,
                    'days-week': 5,
                    holidays: 25,
                    training: 5,
                    sick: 2
                }
            };

            const billableHours = BillableHours.calculateBillableHours(userInfo.hours);

            const warningMessage = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!'
            assert.equal(billableHours, warningMessage);
        })
    })

    describe('Earnings', () => {

        it('Calculates gross earnings per year', () => {
            const userInfo = {
                expenses: {
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
                },
                'net-monthly-salary': 2000,
                'tax-percent': 25,
            }

            const grossEarningsYear = Earnings.calculateGrossEarnings(userInfo);

            assert.equal(grossEarningsYear, 34600)

        })
    })

    describe('Final results', () => {
        it('Calculates goal rate', () => {
            const userInfo = {
                expenses: {
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
                },
                hours: {
                    'hours-day': 8,
                    '%non-billable': 20,
                    'days-week': 5,
                    holidays: 25,
                    training: 5,
                    sick: 8
                },
                'net-monthly-salary': 2000,
                'tax-percent': 25,
            }
            const calculator = new RateCalculator(userInfo);

            const goalRate = calculator.calculateGoalRate(userInfo);

            assert.equal(goalRate, 24.35)
        })

        it('Sends final message with all the info', () => {
            const userInfo = {
                expenses: {
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
                },
                hours: {
                    'hours-day': 8,
                    '%non-billable': 20,
                    'days-week': 5,
                    holidays: 25,
                    training: 5,
                    sick: 8
                },
                'net-monthly-salary': 2000,
                'tax-percent': 25,
            }
            const calculator = new RateCalculator(userInfo);

            calculator.calculateGoalRate();
            const message = calculator.getFinalMessage(userInfo);

            const expectedMessage = 'You should charge at least 24.35 per hour. You said you want to work 8 hours per day. Of those, 20% will not be billable. Taking weekend, vacation, training and sick time into account, this means you will charge your clients for 1420.80 hours per year. Your goal is to earn 2000 net per month. Since your tax rate is 25% and your estimated annual expenses are 2600, this adds up to 34600 gross per year. 34600 income / 1420.80 hours = 24.35 per hour. Easy peasy!'
            assert.equal(message, expectedMessage)
        })
    })
})