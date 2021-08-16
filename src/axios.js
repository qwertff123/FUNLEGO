import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8886";
//允许服务端设置cookie
axios.defaults.withCredentials = true;
axios.interceptors.response.use(({ data }) => {
    return data;
})
axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    //每次发送请求都要携带token
    if(token){
        config.headers.authorization = "bearer " + token;
        
    }else{
        console.log("登录过期");
    }
    return config;
})
export default axios;