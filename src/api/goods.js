import axios from "../axios";

/**
 * 得到请求过来的商品数据
 * @return promise对象
 */
export function getGoodsList(page = 1, limit = 5) {

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

export function getFilterGoods(condition, limit = 5, page = 1) {
    return axios({
        method: "get",
        url: "/api/goods/filter",
        params: {
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
export function getGoodsImg(goodsId) {
    return axios({
        method: "get",
        url: "/api/goods/image/" + goodsId,
    })
}

/**
 * 根据商品Id获取商品标签
 * @param {*} goodsId 
 */
export function getTags(goodsId) {
    return axios({
        method: "get",
        url: "/api/getTags",
        params: {
            goodsId
        }
    })
}

/**
 * 获取所有的商品标签
 */
export function getAllTags() {
    return axios({
        method: "get",
        url: "/api/getAllTags"
    })
}

export function addTag(name) {
    return axios({
        method: "post",
        url: "/api/tag",
        data: {
            name
        }
    })
}

/**
 * 获取商品的所有类别
 * @returns 
 */
export function getAllCategory() {
    return axios({
        method: "get",
        url: "/api/category"
    })
}

// export function getAllCategoryAndSub(){
//     return axios({
//         method : "get",
//         url : "/api/getAllCategoryAndSub"
//     })
// }
/**
 * 获取商品的所有子类
 * @param {*} category 商品类别
 */
export function getSubCategory(category) {
    return axios({
        method: "get",
        url: "/api/getSubCategory",
        params: {
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
        url: "/api/goods/" + id
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
export function updateCategory(id, categoryInfo) {
    return axios({
        method: "put",
        url: "/api/category",
        data: {
            id,
            ...categoryInfo
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
        method: "post",
        url: "/api/category",
        data: categoryInfo
    })
}

/**
 * 移除商品类别
 * @param {*} option 
 * @returns 
 */
// export function removeCategory(option) {
//     const {
//         appkey,
//         id = Math.round(Math.random() * 1000000),
//     } = option;
//     return axios({
//         method: "delete",
//         url: "/category/" + id,
//         data: {
//             appkey,
//             id
//         }
//     })
// }

/**
 * 移除子类
 * @param {*} id 子类id
 * @returns 
 */
export function removeSubCategory(id) {
    return axios({
        method: "delete",
        url: "/api/subCategory",
        data: {
            id
        }
    })
}

/**
 * 上传商品图片
 * @param {*} formData FormData实例对象
 * @returns 
 */
export function addGoodsImg(formData) {
    return axios({
        method: "post",
        url: "/api/goods/image",
        data: formData
    })
}


/**
 * 删除商品图片
 * @param {*} goodsId
 * @param {*} imgId 
 * @returns 
 */
export function removeGoodsImg(goodsId, imgId) {
    return axios({
        method: "delete",
        url: "/api/goods/image",
        data: {
            goodsId,
            imgId
        }
    })
}

/**
 * 上传图片
 * @param {*} formData 
 * @returns 
 */
export function uploadImg(formData) {
    return axios({
        method: "post",
        url: "/api/image",
        data: formData
    })
}

export function removeImg(id) {
    return axios({
        method: "delete",
        url: "/api/image",
        data: {
            id
        }
    })
}

export function deleteTag(name) {
    return axios({
        method: "delete",
        url: "/api/tag",
        data: {
            name
        }
    })
}