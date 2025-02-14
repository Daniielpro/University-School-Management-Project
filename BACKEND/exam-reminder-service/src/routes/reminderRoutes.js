const express = require('express');
const { addReminder, getReminders } = require('../controllers/reminderController');

const reminderRoutes = (db) => {
    const router = express.Router();
    router.post('/reminders', (req, res) => addReminder(db, req, res));
    router.get('/reminders', (req, res) => getReminders(db, req, res));
    return router;
};

module.exports = reminderRoutes;