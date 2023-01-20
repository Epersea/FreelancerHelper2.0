class RateCalculator {

    calculateAnnualExpenses(expenses) {
        let annualExpenses = 0;
        annualExpenses += this.calculateLongTermExpenses(expenses)

        return annualExpenses;
    }
    
    calculateLongTermExpenses(expenses) {
        let longTermExpenses = 0;
        for (let expense of expenses["long-term"]) {
            longTermExpenses += (expense.price / expense.years);
        }
        return longTermExpenses;
    }
}

const calculator = new RateCalculator;


module.exports = RateCalculator;