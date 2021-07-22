import axios from "../axios";

const baseURL = "http://10.157.117.193:3000";
export function getOrderList(){
    return axios({
        method : "get",
        baseURL : baseURL + "/getOrderList"
    })
}