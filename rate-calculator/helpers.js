const formInput = {
    fixed1amount: '1500',
    fixed1years: '5',
    fixed2amount: '1000',
    fixed2years: '10',
    fixed3amount: '0',
    fixed3years: '0',
    fixed4amount: '0',
    fixed4years: '0',
    yearly: '1000',
    monthly: '100',
    hoursDay: '8',
    percentNonBillable: '20',
    daysWeek: '5',
    holidays: '25',
    training: '5',
    sick: '8',
    netMonthlySalary: '2200',
    taxPercent: '24'
  }


const userInfoConverter = (formInput) => {
    let convertedInfo = {
            expenses: {
                longTerm: [
                    {
                        amount: 0.0,
                        years: 0
                    },
                    {
                        amount: 0.0,
                        years: 0
                    },
                    {
                        amount: 0.0,
                        years: 0
                    },
                    {
                        amount: 0.0,
                        years: 0
                    }],
                yearly: 0.0,
                monthly: 0
            },
            hours: {
                hoursDay: 0,
                percentNonBillable: 0,
                daysWeek: 0,
                holidays: 0,
                training: 0,
                sick: 0
            },
            netMonthlySalary: 0,
            taxPercent: 0
    };
    convertedInfo.expenses.longTerm[0].amount = Number(formInput.fixed1amount);
    convertedInfo.expenses.longTerm[0].years = Number(formInput.fixed1years);
    convertedInfo.expenses.longTerm[1].amount = Number(formInput.fixed2amount);
    convertedInfo.expenses.longTerm[1].years = Number(formInput.fixed2years);
    convertedInfo.expenses.longTerm[2].amount = Number(formInput.fixed3amount);
    convertedInfo.expenses.longTerm[2].years = Number(formInput.fixed3years);
    convertedInfo.expenses.longTerm[3].amount = Number(formInput.fixed4amount);
    convertedInfo.expenses.longTerm[3].years = Number(formInput.fixed4years);
    convertedInfo.expenses.yearly = Number(formInput.yearly);
    convertedInfo.expenses.monthly = Number(formInput.monthly);
    convertedInfo.hours.hoursDay = Number(formInput.hoursDay);
    convertedInfo.hours.percentNonBillable = Number(formInput.percentNonBillable);
    convertedInfo.hours.daysWeek = Number(formInput.daysWeek);
    convertedInfo.hours.holidays = Number(formInput.holidays);
    convertedInfo.hours.training = Number(formInput.hoursDay);
    convertedInfo.hours.sick = Number(formInput.sick);
    convertedInfo.netMonthlySalary = Number(formInput.netMonthlySalary);
    convertedInfo.taxPercent = Number(formInput.taxPercent);
    return convertedInfo;
}

module.exports = userInfoConverter;