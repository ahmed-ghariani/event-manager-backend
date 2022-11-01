const jwt = require("./jwt");
const asyncHandler = require("express-async-handler");
const ResponceError = require('../errorHandler/responceError')

exports.auth = asyncHandler(async (req,res,next) => {

    let token ;

    try {
        token = req.headers.authorization.split(' ')[1];
    } catch (error) {
        return next(new ResponceError("YOU SHALL NOT PASS",401));
    }

    const payload = jwt.verify(token);

    req.roles = payload.roles;

    return next();

});

exports.hasRole = (role) => {
    return asyncHandler(async (req,res,next) =>{
        if(!req.roles.includes(role)){
            return next(new ResponceError("access denied",403));
        }
        return next();
    });
};