const jwt = require("jsonwebtoken");

const secret = "MySecret";

exports.generateToken = (id,roles) => {
    return jwt.sign({id,roles},secret,{expiresIn:"1h"});
}

exports.verify = (token) =>{
    return jwt.verify(token,secret);
}


