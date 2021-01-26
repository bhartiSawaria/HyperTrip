
const User = require('../models/user');

exports.createUser = async(userInfo) => {
    try{
        let createdUser = await new User(userInfo);
        createdUser = await createdUser.save();
        return createdUser;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}

exports.findUserWithEmail = async(email) => {
    try{
        const user = await User.findOne({email: email});
        return user;
    }
    catch(error){
        error.message = 'Some db error!';
    }
}