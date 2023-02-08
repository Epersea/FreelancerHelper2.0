const Expenses = require('./expenses.js');
const Earnings = require('./earnings.js');
const BillableHours = require('./billableHours.js');

class RateCalculator {

    constructor(userInfo) {
        this.userInfo = {...userInfo};
        this.userInfo.annualExpenses = Expenses.calculateAnnualExpenses(userInfo.expenses);
    }

    calculateGoalRate() {
        const annualGrossEarnings = Earnings.calculateGrossEarnings(this.userInfo);
        this.userInfo.grossEarnings = annualGrossEarnings;

        const billableHours = BillableHours.calculateBillableHours(this.userInfo.hours);
        this.userInfo.billableHours = billableHours.hours;

        const goalRate = (annualGrossEarnings / billableHours.hours).toFixed(2);
        this.userInfo.goalRate = goalRate;

        return goalRate;
    }

    getFinalMessage() {
        const finalMessage = `You should charge at least ${this.userInfo.goalRate} per hour. You said you want to work ${this.userInfo.hours.hoursDay} hours per day. Of those, ${this.userInfo.hours.percentNonBillable}% will not be billable. Taking weekend, vacation, training and sick time into account, this means you will charge your clients for ${this.userInfo.billableHours} hours per year. Your goal is to earn ${this.userInfo.netMonthlySalary} net per month. Since your tax rate is ${this.userInfo.taxPercent}% and your estimated annual expenses are ${this.userInfo.annualExpenses}, this adds up to ${this.userInfo.grossEarnings} gross per year. ${this.userInfo.grossEarnings} income / ${this.userInfo.billableHours} hours = ${this.userInfo.goalRate} per hour. Easy peasy!`;
        
        return finalMessage;
    }

}


module.exports = RateCalculator;