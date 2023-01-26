const Expenses = require('./expenses.js');

class Earnings {

    static calculateGrossEarnings(userInfo) {
        const annualNetSalary = userInfo['net-monthly-salary'] * 12;
        const taxFreePercentage = 100 - userInfo['tax-percent'];
        const annualExpenses = Expenses.calculateAnnualExpenses(userInfo.expenses);
        const annualGrossSalary = annualNetSalary * 100 / taxFreePercentage;
        const annualGrossEarnings = annualGrossSalary + annualExpenses;
        return annualGrossEarnings;
    }

}

module.exports = Earnings;