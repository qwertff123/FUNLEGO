const jwt = require("../jwt");
module.exports = function(options){
    const { whiteList } = options;
    return function(req,res,next){
        if(whiteList.includes(req.path)){
            //在白名单内的则不需要身份验证
            return next();
        }
        const authorization = req.headers.authorization;
        if(!authorization){
            //校验失败
            next(Error("还未登录，拒绝访问"));
        }else{
            const result = jwt.verify(authorization.split(" ")[1]);
            //将username放入到request对象中
            req.username = result.username;
            req.admin = result.admin;
            console.log("身份",result)
            next();
        }
    }
}