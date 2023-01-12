const express = require('express');
const clientsRouter = express.Router();

clientsRouter.get('/projects', (req, res) => {
    res.send('TO DO: render addproject.html');
})

clientsRouter.post('/projects', (req, res) => {
    res.send('TO DO: add project');
})

clientsRouter.put('/projects/:projectid', (req, res) => {
    res.send('TO DO: update project');
})

clientsRouter.delete('/projects/:projectid', (req, res) => {
    res.send('TO DO: delete project');
})

clientsRouter.get('/:clientid', (req, res) => {
    res.send('TO DO: display client stats');
})

module.exports = clientsRouter;