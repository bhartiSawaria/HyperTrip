
const express = require('express');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator/check');

const authControllers = require('../controllers/auth');
const userUtils = require('../database/user');

const router = express.Router();

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            return userUtils.findUserWithEmail({email: value}).then(user => {
                if(user){
                    return Promise.reject('Email address already registered!');
                }
            })
        }),
    
    body('name')
        .trim()
        .isLength({min: 3})
        .withMessage('Name should atleast be 3 characters long.')
        .isLength({max: 30})
        .withMessage('Name can atmost be 30 characters long'),

    body('password')
        .trim()
        .isLength({min: 6})
        .withMessage('Password should atleat be 6 characters long.')
        
], authControllers.postSignup);


router.post('/login', [
    body('email')
        .custom((value, {req}) => {
            return userUtils.findUserWithEmail({email: value}).then(user => {
                if(!user){
                    return Promise.reject('This E-mail is not registered.');
                }
            })
        }),

    body('password')
        .custom((value, {req}) => {
            return userUtils.findUserWithEmail({email: req.body.email}).then(user => {
                if(user){
                    return bcrypt
                            .compare(value, user.password)
                            .then(isEqual => {
                                if(!isEqual){
                                    return Promise.reject('Please enter the correct password.');
                                }
                            })
                }
            })
        })
], authControllers.postLogin);

module.exports = router;