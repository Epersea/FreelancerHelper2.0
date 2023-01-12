const express = require('express');
const app = express();
const port = 3000;

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

app.get('/summary', (req, res) => {
    res.send('TO DO: display summary');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

module.exports = app;