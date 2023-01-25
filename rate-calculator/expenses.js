const RateCalculator = require('./rateCalculator.js');

class Expenses {

    static calculateAnnualExpenses(expenses) {
        let annualExpenses = 0; 
        annualExpenses += this.calculateLongTermExpenses(expenses);
        annualExpenses += this.calculateYearlyExpenses(expenses);
        annualExpenses += this.calculateMonthlyExpenses(expenses);
        expenses.annual = annualExpenses;
        return annualExpenses;
    }

    static calculateLongTermExpenses(expenses) {
        let longTermExpenses = 0;
        if (expenses["long-term"]) {
            for (let expense of expenses["long-term"]) {
                longTermExpenses += (expense.price / expense.years);
            }
        }

        return longTermExpenses;
    }

    static calculateYearlyExpenses(expenses) {
        let yearlyExpenses = 0;
        if (expenses.yearly) {
            yearlyExpenses += expenses.yearly;
        }

        return yearlyExpenses;
    }

    static calculateMonthlyExpenses(expenses) {
        let monthlyExpenses = 0;
        if (expenses.monthly) {
            return expenses.monthly * 12;
        } 

        return monthlyExpenses;
    }

}

module.exports = Expenses;