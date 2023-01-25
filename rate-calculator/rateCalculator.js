class RateCalculator {

    constructor(userInfo) {
        this.userInfo = userInfo;
    }

    burnOutMessage = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!'

    calculateAnnualExpenses() {
        const expenses = this.userInfo.expenses;
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

    calculateBillableHours() {
        const hours = this.userInfo.hours;
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

    calculateGrossEarnings() {
        const annualNetSalary = this.userInfo['net-monthly-salary'] * 12;
        const taxFreePercentage = 100 - this.userInfo['tax-percent'];
        const annualExpenses = this.calculateAnnualExpenses(this.userInfo.expenses);
        const annualGrossSalary = annualNetSalary * 100 / taxFreePercentage;
        const annualGrossEarnings = annualGrossSalary + annualExpenses;
        return annualGrossEarnings;
    }

    calculateGoalRate() {
        const annualGrossEarnings = this.calculateGrossEarnings(this.userInfo);
        const billableHours = this.calculateBillableHours(this.userInfo.hours);
        const goalRate = (annualGrossEarnings / billableHours).toFixed(2);
        return goalRate;
    }
}



module.exports = RateCalculator;