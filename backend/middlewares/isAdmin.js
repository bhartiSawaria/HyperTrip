
module.exports = async(req, res, next) => {
    console.log('isAdmin.js');
    // console.log(req);
    if(!(req.body.isAdmin || req.query.isAdmin)){
        const error = new Error('Only admin can access this.');
        error.setStatus = 403;
        return next(error);
    }
    next();
}