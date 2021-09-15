const Tag = require("../model/tag");
const Goods = require("../model/goods");
const {
    Op
} = require("sequelize")

// exports.getTags = async function(goodsId){
//     const result = await Tag.findAll({
//         include : {
//             model : Goods,
//             attributes : [],
//         },
//         attributes : ["name"],
//         where : {
//             "$Goods.id$" : goodsId
//         }
//     });
//     return result;
// }
/**
 * 获取商品的标签
 * @param {*} goodsId 商品Id
 * @returns 
 */
exports.getTags = async function (goodsId) {
    const result = await Goods.findOne({
        include: {
            model: Tag,
            attributes: ["name"],
            through: {
                attributes: []
            }
        },
        attributes: ["tags.name"],
        where: {
            id: goodsId
        }
    });
    return result;
}

/**
 * 获取所有的标签
 */
exports.getAllTags = async function () {
    return await Tag.findAll({
        order: [
            ["createdAt"]
        ]
    });
}

/**
 * 添加标签
 * @param {*} name 标签名
 * @returns 
 */
exports.addTag = async function (name) {
    return await Tag.create({
        name
    })
}

/**
 * 删除标签名
 * @param {*} name 标签名
 * @returns 
 */
exports.deleteTag = async function (name) {
    return await Tag.destroy({
        where: {
            name
        }
    })
}

/**
 * 更新商品所对应的标签
 */
exports.updateGoodsTags = async function (goodsId, tags = ["热销"]) {
    /* 处理多对多关系的模型的数据修改 */

    //1.先获取指定商品的模型实例
    const goods = await Goods.findByPk(goodsId);
    //2.此模型会被注入一个getTags方法（例如此方法命名规定为`get` + `与其关联的表名的复数形式`），其可以通过比对
    //记录多对多关系的表中检索出与其相对应的tag的模型
    const oldTags = await goods.getTags();
    //3.通过注入的reomveTags方法传入tag模型，即可删除与该商品关联的所有的tag的记录
    await goods.removeTags(oldTags);
    //4.通过传入的参数tags找出所有符合要求的tag并组装成一个模型实例
    const tag = await Tag.findAll({
        where: {
            [Op.or]: tags.map(tag => {
                return {
                    name: tag
                }
            })
        }
    });
    //5.通过注入setTags方法，传入一个模型实例即可在其所生成的多对多关系表中建立相应的关系
    const result = await goods.setTags(tag);
}