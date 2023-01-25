class RateCalculator {

    burnOutMessage = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!'

    calculateAnnualExpenses(expenses) {
        let annualExpenses = 0; 
        annualExpenses += this.calculateLongTermExpenses(expenses);
        annualExpenses += this.calculateYearlyExpenses(expenses);
        annualExpenses += this.calculateMonthlyExpenses(expenses);

        return annualExpenses;
    }
    
    calculateLongTermExpenses(expenses) {
        let longTermExpenses = 0;
        if (expenses["long-term"]) {
            for (let expense of expenses["long-term"]) {
                longTermExpenses += (expense.price / expense.years);
            }
        }

        return longTermExpenses;
    }

    calculateYearlyExpenses(expenses) {
        let yearlyExpenses = 0;
        if (expenses.yearly) {
            yearlyExpenses += expenses.yearly;
        }

        return yearlyExpenses;
    }

    calculateMonthlyExpenses(expenses) {
        let monthlyExpenses = 0;
        if (expenses.monthly) {
            return expenses.monthly * 12;
        } 

        return monthlyExpenses;
    }

    calculateBillableHours(hours) {
        if (this.userIsWorkingTooMuch(hours)) {
            return this.burnOutMessage;
        }
        const netHoursDay = this.calculateNetHoursDay(hours);
        const daysPerYear = this.calculateDaysPerYear(hours);
        const billableHours = (netHoursDay * daysPerYear).toFixed(2);
        return billableHours;
    }

    userIsWorkingTooMuch(hours) {
        return hours['hours-day'] > 10 || hours['days-week'] > 6 || hours.holidays < 15 || hours.sick < 5;
    }

    calculateNetHoursDay(hours) {
        const nonBillableHours = hours['hours-day'] * hours['%non-billable'] / 100;
        const netHours = hours['hours-day'] - nonBillableHours;
        return netHours;
    }

    calculateDaysPerYear(hours) {
        const potentialWorkingDays = hours['days-week'] * 52;
        const realWorkingDays = potentialWorkingDays - hours.holidays - hours.training - hours.sick;
        return realWorkingDays;
    }
}

const calculator = new RateCalculator;
const hours = {
    'hours-day': 8,
    '%non-billable': 20,
}

const netHoursPerDay = calculator.calculateNetHoursDay(hours);
console.log(netHoursPerDay)


module.exports = RateCalculator;