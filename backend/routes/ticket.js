
const express = require('express');

const isAuth = require('../middlewares/isAuth');
const ticketControllers = require('../controllers/ticket');

const router = express.Router();

router.post('/book-ticket', isAuth, ticketControllers.postBookTicket);

router.get('/seat/booked-by', isAuth);

module.exports = router;