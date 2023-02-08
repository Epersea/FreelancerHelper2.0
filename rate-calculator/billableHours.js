class BillableHours {

    static calculateNetHoursDay({hoursDay, percentNonBillable}) {
        const nonBillableHours = hoursDay * percentNonBillable / 100;
        const netHours = hoursDay - nonBillableHours;

        return netHours;
    }

    static calculateDaysPerYear({daysWeek, holidays, training, sick}) {
        const potentialWorkingDays = daysWeek * 52;
        const realWorkingDays = potentialWorkingDays - holidays - training - sick;

        return realWorkingDays;
    }

    static calculateBillableHours(hours) {
        let billableHours = {};
        if (this.userIsWorkingTooMuch(hours)) {
            billableHours.message = 'It looks like you are working too much! Your working habits should be sustainable over the long run. Make sure to have enough rest and holidays and remember everybody gets sick from time to time. Take care!';
        }
        const netHoursDay = this.calculateNetHoursDay(hours);
        const daysPerYear = this.calculateDaysPerYear(hours);
        billableHours.hours = (netHoursDay * daysPerYear).toFixed(2);
        
        return billableHours;
    }

    static userIsWorkingTooMuch({hoursDay, daysWeek, holidays, sick}) {
        return hoursDay > 10 || daysWeek > 6 || holidays < 15 || sick < 5;
    }
}

module.exports = BillableHours;