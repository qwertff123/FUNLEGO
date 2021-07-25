const jwt = require("jsonwebtoken");
const secret = "qwertff";

exports.sign = function(payload,options){
    return jwt.sign(payload,secret,options);
}

exports.verify = function(token){
    return jwt.verify(token,secret);
}