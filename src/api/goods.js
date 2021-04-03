import axios from "../axios";

/**
 * 得到请求过来的商品数据
 * @param { String } appkey
 * @return promise对象
 */
export function getGoodsList(appkey) {
    return axios({
        methods: "get",
        url: "/products/all",
        params: {
            appkey
        },
    });
}

/**
 * 通过id查询商品的详细信息
 * @param { Object } 具有id，appkey属性的对象 
 * @returns promise对象
 */
export function getGoodsDetail({
    id,
    appkey
}) {
    return axios({
        methods: "get",
        url: "/products/" + id,
        params: {
            appkey
        },
    });
}

/**
 * 移除指定id的商品信息
 * @param {*} id 
 */
export function removeGoods(id) {
    return axios({
        method: "delete",
        url: "/products/" + id,
        params: {
            appkey: "qwertff_1616028685554",
        },
    })
}

/**
 * 添加商品信息
 * @param {*} data 包括商品信息的表单数据以及appkey
 * @returns 
 */
export function addGoods(data) {
    return axios({
        method: "post",
        url: "/products/add",
        data: {
            ...data     
        },
    })
}

/**
 * 修改商品信息
 * @param {*} data 包括商品信息的表单数据以及appkey
 * @returns 
 */
export function editGoods(data){
    return axios({
        method: "put",
        url: "/products/edit",
        data: {
          ...data
        },
      })
}
/**
 * 得到所有类目信息
 * @param { String } appkey
 */
export function getCategoryInfo(appkey) {
    return axios({
        methods: "get",
        url: "/category/all",
        params: {
            appkey
        },
    });
}