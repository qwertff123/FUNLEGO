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
 * @param { Number } 商品Id
 * @returns promise对象
 */
export function getGoodsById(goodsId) {
    return axios({
        methods: "get",
        url: "/api/goods/" + goodsId,
    });
}

/**
 * 通过关键字获取商品信息列表
 * @param {*} keyword 关键字
 * @param {*} limit 每页商品的数量
 * @param {*} page 当前页数
 */
// export function getGoodsByKw(keyword,limit = 5,page = 1){
//     return axios({
//         method : "get",
//         url : "/api/goods/findBykw",
//         params : {
//             keyword,
//             limit,
//             page
//         }
//     })
// }

export function getFilterGoods(condition,limit = 5,page = 1){
    return axios({
        method : "get",
        url : "/api/goods/filter",
        params : {
            condition,
            limit,
            page
        }
    })
}

/**
 * 根据商品Id获取商品的链接
 * @param {*} id 
 * @returns 
 */
export function getImgSrc(goodsId){
    return axios({
        method : "get",
        url : "/api/img",
        params : {
            goodsId
        }
    })
}

/**
 * 根据商品Id获取商品标签
 * @param {*} goodsId 
 */
export function getTags(goodsId){
    return axios({
        method : "get",
        url : "/api/getTags",
        params : {
            goodsId
        }
    })
}

/**
 * 获取所有的商品标签
 */
export function getAllTags(){
    return axios({
        method : "get",
        url : "/api/getAllTags"
    })
}

/**
 * 获取商品的所有类别
 * @returns 
 */
export function getAllCategory(){
    return axios({
        method : "get",
        url : "/api/category"
    })
}

export function getAllCategoryAndSub(){
    return axios({
        method : "get",
        url : "/api/getAllCategoryAndSub"
    })
}
/**
 * 获取商品的所有子类
 * @param {*} category 商品类别
 */
export function getSubCategory(category){
    return axios({
        method : "get",
        url: "/api/getSubCategory",
        params : {
            category
        }
    })
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
        url: "/api/goods",
        data,
    })
}

/**
 * 修改商品信息
 * @param {*} data 包括商品信息的表单数据以及appkey
 * @returns 
 */
export function updateGoods(data) {
    return axios({
        method: "put",
        url: "/api/goods",
        data
    })
}
/**
 * 得到所有类目信息
 * @param { String } appkey
 */
// export function getCategoryInfo(appkey) {
//     return axios({
//         method: "get",
//         url: "/category/all",
//         params: {
//             appkey
//         },
//     });
// }

/**
 * 修改商品类名
 * @param {*} categoryId 类Id
 * @param {*} category 类名
 */
export function updateCategory(oldCategory,newCategory){
    return axios({
        method : "put",
        url : "/api/category",
        data : {
            oldCategory,
            newCategory
        }
    })
}

/**
 * 添加商品类别
 * @param {*} categoryInfo 
 * @returns 
 */
export function addCategory(categoryInfo) {
   return axios({
       method : "post",
       url : "/api/category",
       data : categoryInfo
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

/**
 * 上传商品图片
 * @param {*} formData FormData实例对象
 * @returns 
 */
export function uploadImg_goods(formData){
    return axios({
        method : "post",
        url : "/api/imgForGoods",
        data : formData
    })
}

/**
 * 
 * @param {*} imgId 
 * @returns 
 */
export function uploadImg_category(){
    
}


/**
 * 删除图片
 * @param {*} imgId 图片Id
 * @returns 
 */
export function removeImg(imgId){
    return axios({
        method : "delete",
        url : "/api/img",
        data : imgId
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