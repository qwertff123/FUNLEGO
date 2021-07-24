import axios from "../axios";

/**
 * 得到请求过来的商品数据
 * @return promise对象
 */
export function getGoodsList(page=1,limit=5) {
    
    return axios({
        methods: "get",
        url: "/api/goods",
        params: {
            page,
            limit
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
export function editGoods(data) {
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
        method: "get",
        url: "/category/all",
        params: {
            appkey
        },
    });
}
/**
 * 添加商品类别
 * @param {*} option 
 * @returns 
 */
export function addCategory(option) {
    /* eslint-disable */
    const {
        appkey,
        id,
        name,
        c_items
    } = option;
    console.log(name)
    return axios({
        method: "post",
        url: "/category/add",
        data: {
            appkey,
            id,
            name,
            c_items
        }
    })
}

/**
 * 移除商品类别
 * @param {*} option 
 * @returns 
 */
export function removeCategory(option) {
    const {
        appkey,
        id = Math.round(Math.random() * 1000000),
    } = option;
    return axios({
        method: "delete",
        url: "/category/" + id,
        data: {
            appkey,
            id
        }
    })
}

export function editSubCategory(option) {
    const {
        appkey,
        id,
        name,
        c_items
    } = option;
    return axios({
        method: "put",
        url: "/category/edit",
        data: {
            appkey,
            id,
            name,
            c_items
        }
    })
}