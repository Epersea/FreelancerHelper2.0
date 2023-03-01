const express = require('express');
const sqlite3 = require('sqlite3');
const morgan = require('morgan');
const {ValidationError} = require('express-json-validator-middleware');

const app = express();
const db = new sqlite3.Database('./database')
const port = 3000;

app.use(express.json());
app.use(morgan('common'));

const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const rateRouter = require('./routes/rate')
const clientsRouter = require('./routes/clients')

app.use('/', homeRouter);
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/rate', rateRouter)
app.use('/clients', clientsRouter)

app.use((error, request, response, next) => {
  if (error instanceof ValidationError) {
    response.status(400).send(error.validationErrors);
    next();
  } else {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

module.exports = app;