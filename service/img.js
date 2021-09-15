const Img = require("../model/img");
// /**
//  * 获取商品对应的图片
//  * @param {*} goodsId 
//  */
//  exports.getImgSrc = async function(goodsId){
//     return await Img.findAll({
//         raw : true,
//         where : {
//             goodsId
//         },
//         attributes : ["id","src"]
//     })
// }

/**
 * 添加图片
 * @param {*} src 图片的src
 * @returns 
 */
exports.addImgSrc = async function (src) {
    console.log(src)
    return await Img.create({
        src
    },{
        attributes : ["id","src"]
    });
}

// /**
//  * 创建商品的图片
//  * @param {*} goodsId 商品的id
//  * @param { String } src 商品图片的路径
//  * @returns 
//  */
// exports.createImgSrc_goods = async function(goodsId,src){
//     return await Img.create({
//         src,
//         goodsId
//     },{
//         attributes : ["id","src"]
//     })
// }

/**
 * 移除商品的图片
 * @param {*} id 图片Id
 */
exports.removeImgSrc = async function (id) {
    return await Img.destroy({
        where: {
            id
        }
    })
}

/**
 * 根据图片的Id获取图片的信息
 */
exports.getImgById = async function (id) {
    return await Img.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
}