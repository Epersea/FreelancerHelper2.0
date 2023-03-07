const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app.js');
const rateCalcURL = 'http://localhost:3000/rate';

chai.use(chaiHttp);

const userInfo = {
    expenses: {
        longTerm: [
            {
                amount: 1500.0,
                years: 5
            },
            {
                amount: 1000.0,
                years: 10
            }],
        yearly: 1000.0,
        monthly: 100
    },
    hours: {
        hoursDay: 8,
        percentNonBillable: 20,
        daysWeek: 5,
        holidays: 25,
        training: 5,
        sick: 8
    },
    netMonthlySalary: 2000,
    taxPercent: 25,
};

const invalidUserInfo = {
    expenses: {
        longTerm: [
            {
                amount: 1000.0,
                years: 2
            },
            {
                amount: 220.0,
                years: 10
            }],
        yearly: 4000.0,
        monthly: 120
    },
}

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

describe('Rate calculator endpoints', () => {
    it('Gets rate calculator form page', (done) => {
        chai.request(rateCalcURL)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                done();
            });
    });

    it('Posts user information and obtains calculation message', (done) => {
        chai.request(rateCalcURL)
            .post('/')
            .send(formInput)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('You should charge at least 24.35 per hour. You said you want to work 8 hours per day. Of those, 20% will not be billable. Taking weekend, vacation, training and sick time into account, this means you will charge your clients for 1420.80 hours per year. Your goal is to earn 2000 net per month. Since your tax rate is 25% and your estimated annual expenses are 2600, this adds up to 34600 gross per year. 34600 income / 1420.80 hours = 24.35 per hour. Easy peasy!');
                done();
            });
    });

    it('Throws error when user info does not follow schema', (done) => {
        chai.request(rateCalcURL)
            .post('/')
            .send(invalidUserInfo)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal("must have required property \'fixed1amount\'");
                done();
            });
    });
});

