
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../keyInfo');
const User = require('../models/user');

exports.postSignup = async(req, res, next) => {
    try{
        const errors = validationResult(req);
        if( !errors.isEmpty() ){
            const err = new Error('Sign up failed!');
            err.data = errors.array(); 
            err.statusCode = 422;
            throw err;
        }

        const name = req.body.name;
        const email = req.body.email;
        const phoneNo = parseInt(req.body.phoneNo);
        const gender = req.body.gender;
        const password = req.body.password;
        const isAdmin = req.body.isAdmin === 'true' ? true : false;
    
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            phoneNo: phoneNo,
            gender: gender,
            password: hashPassword,
            isAdmin: isAdmin
        });
        const createdUser = await user.save();
        res.status(201).json({
            message: 'Signed up successfully.',
            success: true,
            user: createdUser
        })
    }
    catch(error) {
        console.log('Error occured!', error);
        error.statusCode = 500;
        next(error);
    }
}

exports.postLogin = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('Login failed!');
        err.statusCode = 422;
        err.data = errors.array();
        next(err);
    }

    const email = req.body.email;

    try{
        const currentUser = await User.findOne({email: email});
        const token = jwt.sign({
            email: email,
            userId: currentUser._id
        }, SECRET);

        res.status(200).json({
            token: token, 
            success: true,
            userDetails: {
                id: currentUser._id, 
                name: currentUser.name, 
                isAdmin: currentUser.isAdmin
            }
        });
    }
    catch(err) {
        const error = new Error('Cannot find user!');
        error.statusCode = 500;
        next(error);
    }
}