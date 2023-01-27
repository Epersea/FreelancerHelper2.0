const Expenses = require('./expenses.js');

class Earnings {

    static calculateGrossEarnings(userInfo) {
        const annualNetSalary = userInfo['net-monthly-salary'] * 12;
        const multiplierMinusTax = 100 - userInfo['tax-percent'];
        const annualGrossSalary = annualNetSalary * 100 / multiplierMinusTax;
        const annualExpenses = Expenses.calculateAnnualExpenses(userInfo.expenses);
        const annualGrossEarnings = annualGrossSalary + annualExpenses;

        return annualGrossEarnings;
    }

}

module.exports = Earnings;