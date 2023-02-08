const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('./database')
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

module.exports = app;