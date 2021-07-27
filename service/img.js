const Img = require("../model/img");
/**
 * 获取商品对应的图片
 * @param {*} goodsId 
 */
 exports.getImgSrc = async function(goodsId){
    return await Img.findAll({
        raw : true,
        where : {
            goodsId
        },
        attributes : ["id","src"]
    })
}