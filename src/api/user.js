import axios from "../axios";

/**
 * 用于获取验证码
 * 参数为邮箱
 * @returns promise对象
 */
export function getCode(data) {
    return axios({
        method: "post",
        url: "/passport/getCode",
        data: {
            ...data
        },
    })
}

/**
 * 用于用户登录
 * 参数为邮箱与密码
 * 
 */
export function login(data){
    return axios({
        method: "post",
        url: "/passport/login",
        data: {
          ...data
        },
      });
}

/**
 * 用于用户注册
 * 参数为对象，对象内须有用户名，邮箱，密码，验证码
 */
export function register(data){
    return axios({
        method: "post",
        url: "/passport/logon",
        data: {
          ...data
        },
      })
}
/**
 * 找回密码
 * 参数为邮箱，密码，验证码
 * @returns 
 */
export function findPassword(data){
    return axios({
        method : "post",
        url : "/passport/findBack",
        data : {
          ...data
        }
      })
}
