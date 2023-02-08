const Expenses = require('./expenses.js');

class Earnings {

    static calculateGrossEarnings({ netMonthlySalary, taxPercent, expenses }) {
        const annualNetSalary = netMonthlySalary * 12;
        const multiplierMinusTax = 100 - taxPercent;
        const annualGrossSalary = annualNetSalary * 100 / multiplierMinusTax;
        const annualExpenses = Expenses.calculateAnnualExpenses(expenses);
        const annualGrossEarnings = annualGrossSalary + annualExpenses;

        return annualGrossEarnings;
    }

}

module.exports = Earnings;