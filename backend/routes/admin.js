
const express = require('express');

const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const adminControllers = require('../controllers/admin');

const router = express.Router();

router.post('/reset', isAuth, isAdmin, adminControllers.postReset);

module.exports = router;