class BillableHours {

    static calculateNetHoursDay(hours) {
        const nonBillableHours = hours['hours-day'] * hours['%non-billable'] / 100;
        const netHours = hours['hours-day'] - nonBillableHours;
        return netHours;
    }

    static calculateDaysPerYear(hours) {
        const potentialWorkingDays = hours['days-week'] * 52;
        const realWorkingDays = potentialWorkingDays - hours.holidays - hours.training - hours.sick;
        return realWorkingDays;
    }

    static calculateBillableHours(hours) {
        if (this.userIsWorkingTooMuch(hours)) {
            return 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!';
        }
        const netHoursDay = this.calculateNetHoursDay(hours);
        const daysPerYear = this.calculateDaysPerYear(hours);
        const billableHours = (netHoursDay * daysPerYear).toFixed(2);
        return billableHours;
    }

    static userIsWorkingTooMuch(hours) {
        return hours['hours-day'] > 10 || hours['days-week'] > 6 || hours.holidays < 15 || hours.sick < 5;
    }
}


const userInfo = {
    hours : {
        'hours-day': 9,
        '%non-billable': 20,
        'days-week': 5,
        holidays: 25,
        training: 5,
        sick: 2
    }
};

const billableHours = BillableHours.calculateBillableHours(userInfo.hours);

console.log(billableHours);

module.exports = BillableHours;