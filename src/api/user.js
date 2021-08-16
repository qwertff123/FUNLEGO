import axios from "../axios";

/**
 * 用于获取验证码
 * 参数为邮箱
 * @returns promise对象
 */
export function getCode(email) {
  return axios({
    method: "get",
    url: "/api/getCode",
    data: {
      email
    }
  })
}

/**
 * 用户登录
 * @param {*} email 邮箱
 * @param {*} password 密码
 * @returns 
 */
export function login(email, password) {
  return axios({
    method: "post",
    url: "/api/login",
    data: {
      email,
      password
    },
  });
}

/**
 * 用于用户注册
 * 参数为对象，对象内须有用户名，邮箱，密码，验证码
 */
export function register(data) {
  return axios({
    method: "post",
    url: "/api/register",
    data: {
      ...data
    },
  })
}

/**
 * 利用token换取身份信息
 * @param {*} data 
 * @returns 
 */
export function whoami() {
  return axios({
    method: "get",
    url: "/api/whoami",
  })
}


/**
 * 找回密码
 * 参数为邮箱，密码，验证码
 * @returns 
 */
export function findPassword(data) {
  return axios({
    method: "post",
    url: "/passport/findBack",
    data: {
      ...data
    }
  })
}