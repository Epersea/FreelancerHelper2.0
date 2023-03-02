const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database');
const morgan = require('morgan');
const {ValidationError} = require('express-json-validator-middleware');


app.use(express.json());
app.use(morgan('dev'));

const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const rateRouter = require('./routes/rate');
const clientsRouter = require('./routes/clients');

app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/rate', rateRouter);
app.use('/clients', clientsRouter);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send(err.validationErrors.body[0].message);
    next();
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

module.exports = app;