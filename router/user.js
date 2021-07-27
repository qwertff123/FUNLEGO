const express = require("express");
const router = express.Router();
const userOpt = require("../service/user");
const nodemailer = require("nodemailer");
const jwt = require("./jwt");
const {
    random
} = require("../util");
/**
 * 用户登录
 */
router.post("/login", async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        const userInfo = await userOpt.login(email, password);
        console.log(userInfo);
        //验证通过则设置令牌
        const token = setToken(res, userInfo.username);
        res.send({
            status: "success",
            msg: "登录成功",
            data: {
                token,
                ...userInfo
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 用户注册
 */
router.post("/register", async (req, res, next) => {
    const {
        username,
        email,
        password,
        code
    } = req.body;
    if(!req.session.code){
        return next(Error("未获取验证码"))
    }
    if (req.session.code.expires < Date.now()) {
        //验证码失效，需要重新获取
        return next(Error("验证码失效"));
    }
   
    if (code == req.session.code.value) {
        //验证码正确后创建用户
        try {
            await userOpt.register(username, email, password, username);
            res.send({
                status: "success",
                msg: "注册成功",
                data: "token"
            })
        } catch (err) {
            next(err);
        }
    } else {
        throw Error("验证码错误")
    }
});

/**
 * 发送验证码
 */
router.get("/getCode", (req, res, next) => {
    const email = req.query.email;
    const code = random(100000, 999999);
    req.session.code = {
        expires: Date.now() + 1000 * 60 * 60, //过期时间为60分钟
        // value: code //验证码取6位小数
        value: 666666
    };
    // sendEmail(email, code);
    res.send({
        status: "success",
        msg: "验证码发送成功",
        data: null
    })
});

/**
 * 利用token换取身份
 */
router.get("/whoami",async (req,res)=>{
    const userInfo = await userOpt.getInfo(req.username);
    console.log(userInfo);
    res.send({
        status : "success",
        data : userInfo
    })
});

/**
 * 发送邮件
 * @param {*} email 邮箱
 * @param {*} msg 信息
 */
function sendEmail(email, msg) {
    let transporter = nodemailer.createTransport({
        service: "qq",
        auth: {
            user: "1648494263@qq.com",
            pass: "ebgrvaqvnrdddghd"
        }
    });
    transporter.sendMail({
        from: "1648494263@qq.com",
        to: email,
        subject: "FUNLEGO商品管理后台验证码",
        html: `<h1>${msg}<h1/> `
    }, (err) => {
        if (err)
            throw err;
        console.log("发送成功")
    })
}

/**
 * 设置token
 * @param { Object } res request对象
 * @param { String } username 用户名，当作payload
 */
function setToken(res, username) {
    const token = jwt.sign({
        username
    }, {
        expiresIn: 60 * 60, //一小时后过期
    })
    res.set("authorization", "bearer " + token);
    return token;
}
module.exports = router;