const Expenses = require('./expenses.js');
const Earnings = require('./earnings.js');
const BillableHours = require('./billableHours.js');

class RateCalculator {

    constructor(userInfo) {
        this.userInfo = userInfo;
        this.userInfo['annual-expenses'] = Expenses.calculateAnnualExpenses(userInfo.expenses);
    }

    calculateGoalRate() {
        const annualGrossEarnings = Earnings.calculateGrossEarnings(this.userInfo);
        this.userInfo['gross-earnings'] = annualGrossEarnings;

        const billableHours = BillableHours.calculateBillableHours(this.userInfo.hours);
        this.userInfo['billable-hours'] = billableHours;

        const goalRate = (annualGrossEarnings / billableHours).toFixed(2);
        this.userInfo.goalRate = goalRate;

        return goalRate;
    }

    getFinalMessage() {
        const finalMessage = `You should charge at least ${this.userInfo.goalRate} per hour. You said you want to work ${this.userInfo.hours['hours-day']} hours per day. Of those, ${this.userInfo.hours['%non-billable']}% will not be billable. Taking weekend, vacation, training and sick time into account, this means you will charge your clients for ${this.userInfo['billable-hours']} hours per year. Your goal is to earn ${this.userInfo['net-monthly-salary']} net per month. Since your tax rate is ${this.userInfo['tax-percent']}% and your estimated annual expenses are ${this.userInfo['annual-expenses']}, this adds up to ${this.userInfo['gross-earnings']} gross per year. ${this.userInfo['gross-earnings']} income / ${this.userInfo['billable-hours']} hours = ${this.userInfo.goalRate} per hour. Easy peasy!`;
        
        return finalMessage;
    }

}


module.exports = RateCalculator;