
module.exports = async(req, res, next) => {
    if(!(req.body.isAdmin || req.query.isAdmin)){
        const error = new Error('Only admin can access this.');
        error.setStatus = 403;
        return next(error);
    }
    next();
}