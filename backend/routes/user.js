
const express = require('express');

const isAuth = require('../middlewares/isAuth');
const userControllers = require('../controllers/user');

const router = express.Router();

router.post('/update-status', isAuth, userControllers.postSetStatus);

router.get('/status/:ticketNumber', isAuth, userControllers.getStatus);

router.get('/closed', isAuth, userControllers.getClosedTickets);

router.get('/open', isAuth, userControllers.getOpenTickets);

router.get('/user/details/:ticketNumber', isAuth, userControllers.getUserDetails);

module.exports = router;