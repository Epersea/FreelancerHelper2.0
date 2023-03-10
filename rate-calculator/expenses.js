class Expenses {

    static calculateAnnualExpenses(expenses) {
        let annualExpenses = 0;
        annualExpenses += this.calculateLongTermExpenses(expenses);
        annualExpenses += this.calculateYearlyExpenses(expenses);
        annualExpenses += this.calculateMonthlyExpenses(expenses);

        return annualExpenses;
    }

    static calculateLongTermExpenses(expenses) {
        let longTermExpenses = 0;
        for (let expense of expenses.longTerm) {
            if (expense.amount > 0) {
                longTermExpenses += (expense.amount / expense.years);
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
            monthlyExpenses = expenses.monthly * 12;
        }

        return monthlyExpenses;
    }

}

module.exports = Expenses;