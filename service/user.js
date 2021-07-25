const User = require("../model/user");
const {
    Op
} = require("sequelize");
const md5 = require("md5");


/**
 * 用户登录
 * @param {*} email 邮箱
 * @param {*} password 密码
 */
exports.login = async function (email, password) {
    const result = await User.findOne({
        raw: true,
        where: {
            email,
            password: md5(password)
        },
        attributes : ["username","email","nickname"]
    });
    if (!result) {
        throw Error("邮箱或密码错误")
    }
    return result;
}

/**
 * 用户注册
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 */
exports.register = async function (username, email, password, nickname) {
        const result = await isExtance(username, email)
        if (!result) {
            //用户名与邮箱均不存在，允许创建账号
            await User.create({
                username,
                email,
                password: md5(password), //利用md5对密码加密
                nickname
            });
            return true;
        }
}

/**
 * 更新用户信息
 * @param { String } username 用户名
 * @param { Object } info 需要更改的信息
 * @returns 
 */
exports.updateInfo = async function (username, info) {
    //如果更新的数据中有密码则对密码进行加密
    if (info.password) {
        info.password = md5(info.password);
    }
    let result = await User.update(info, {
        where: {
            username
        }
    });
    return !!result[0];
}

/**
 * 获取用户信息
 * @param {*} username 用户名
 * @returns 
 */
exports.getInfo = async function(username){
    return await User.findOne({
        where : {
            username
        },
        attributes : ["username","email","nickname"]
    })
}
/**
 * 判断用户名或邮箱是否存在
 * @param {*} username 用户名
 * @param {*} email 邮箱
 */
async function isExtance(username, email) {
    let user = await User.findOne({
        where: {
            [Op.or]: [{
                username
            }, {
                email
            }]
        }
    });
    if (user) {
        user = user.dataValues;
        //判断是否已经存在了用户名或email
        if (user.username === username) {
            throw Error("用户名已存在");
        } else if (user.email === email) {
            throw Error("邮箱已存在")
        } else {
            throw Error("用户名与邮箱已存在");
        }
    }
    return false;
}

