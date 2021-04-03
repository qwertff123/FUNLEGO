import axios from "axios";
axios.defaults.baseURL = "https://mallapi.duyiedu.com"
axios.interceptors.response.use(({ data }) => {
    return data;
})
export default axios;