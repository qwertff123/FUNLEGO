const Goods = require("../model/goods");
const Category = require("../model/category");
const SubCategory = require("../model/sub_category");
const sequelize = require("../model/sequelize");
const Sequelize = require("sequelize");
const Tag = require("../model/tag");
/**
 * 每一件商品都对应着一个用户的username
 * 得到商品商品信息
 * @param { String } userId 用户username
 * @param { Number } page 页码
 * @param { Number } page 每页多少条数据
 */
exports.getGoods = async function (username, page, limit) {
    //使用了联表查询并合并数据
    return await Goods.findAndCountAll({
        include: [{ //引入要关联的表
            model: SubCategory,
            attributes: []   //不自动的向结果添加属性，应为这样无法给属性名取别名，结果类似于"category.name" : 123 
            , 
            include : {
                model : Category,
                attributes:[]
            }
        }],
        attributes: {
            exclude: ["createdAt", "updatedAt", "username", "subCategoryId"],
            //使用Sequelize.col手动引入联表引入的属性并为其取别名
            include: [
                [Sequelize.col("sub_category.name"), "subCategory"],
                [Sequelize.col("sub_category.categoryId"), "categoryId"],
                [Sequelize.col("sub_category.category.name"), "category"]
  
            ]
            // include : ["category.name"]
        },
        where: {
            username,
        },
        limit: +limit,
        offset: (page - 1) * limit,
        raw: true //finder的结果默认都为model的示例，可以将raw设置为true，则将返回正常的结果
    });
}

/**
 * 增加商品
 * @param {*} username 用户名
 * @param {*} info 
 */
exports.addGoods = async function (username, info) {
    info.username = username;
    await Goods.create(info);
    return true
}

/**
 * 修改商品
 * @param {*} username 用户名
 * @param {*} id 商品id
 * @param {*} info 修改的商品信息
 * @returns 
 */
exports.updateGoods = async function (username, id, info) {
    await Goods.update(info, {
        where: {
            username,
            id
        }
    });
    return true;
}

/**
 * 删除商品
 * @param {*} username 用户名
 * @param {*} id 商品id
 * @returns 
 */
exports.deleteGoods = async function (username, id) {
    await Goods.destroy({
        where: {
            username,
            id
        }
    })
    return true
}