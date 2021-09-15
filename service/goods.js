const Goods = require("../model/goods");
const Category = require("../model/category");
const SubCategory = require("../model/sub_category");
const Img = require("../model/img");
const Sequelize = require("sequelize");
const {
    Op
} = require("sequelize");

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
            attributes: [], //不自动的向结果添加属性，应为这样无法给属性名取别名，结果类似于"category.name" : 123 
            include: {
                model: Category,
                attributes: []
            }
        }],
        attributes: {
            exclude: ["createdAt", "updatedAt", "username", "subCategoryId"],
            //使用Sequelize.col手动引入联表引入的属性并为其取别名
            include: [
                [Sequelize.col("sub_category.name"), "subCategory"],
                [Sequelize.col("sub_category.category.name"), "category"],
                [Sequelize.col("sub_category.category.Id"), "categoryId"]
            ]
            // include : ["category.name"]
        },
        where: {
            username,
        },
        limit: +limit,
        offset: (page - 1) * limit,
        // raw: true //finder的结果默认都为model的示例，可以将raw设置为true，则将返回正常的结果
    });
}

/**
 * 根据商品Id获取商品信息
 * @param {*} goodsId 商品Id
 * @returns 
 */
exports.getGoodsById = async function (goodsId) {
    return await Goods.findByPk(goodsId, {
        include: [{ //引入要关联的表
            model: SubCategory,
            attributes: [], //不自动的向结果添加属性，应为这样无法给属性名取别名，结果类似于"category.name" : 123 
            include: {
                model: Category,
                attributes: []
            }
        }],
        attributes: {
            exclude: ["createdAt", "updatedAt", "username", "subCategoryId"],
            //使用Sequelize.col手动引入联表引入的属性并为其取别名
            include: [
                [Sequelize.col("sub_category.name"), "subCategory"],
                [Sequelize.col("sub_category.category.name"), "category"],
                [Sequelize.col("sub_category.category.Id"), "categoryId"]
            ]
            // include : ["category.name"]
        },
    });
}
/**
 * 增加商品
 * @param {*} username 用户名
 * @param {*} info 
 */
exports.addGoods = async function (username, info) {
    info.username = username;
    console.log(info);
    if (info.price_off == "") {
        info.price_off = null;
    }
    const result = await Goods.create(info);
    return result
}

/**
 * 修改商品
 * @param {*} username 用户名
 * @param {*} id 商品id
 * @param {*} info 修改的商品信息
 * @returns 
 */
exports.updateGoods = async function (username, id, info) {
    console.log(info);
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

/**
 * 根据goodsId获取相应商品的图片
 * @param {*} goodsId 商品Id
 * @returns 
 */
exports.getGoodsImg = async function (goodsId) {
    return await Goods.findByPk(goodsId, {
        include: {
            model: Img,
            attributes: ["id", "src"],
            through: {
                attributes: []
            }
        },
        attributes: []
    })
}

/**
 * 添加商品图片
 * @param {*} goodsId 
 * @param {*} src 
 * @returns 
 */
exports.addGoodsImg = async function (goodsId, src) {
    const img = await Img.create({
        src
    });
    const goods = await Goods.findByPk(goodsId);
    await goods.addImg(img);
    return img;
}

/**
 * 移除商品图片
 * @param {*} goodsId 商品Id
 * @param {*} imgId 图片Id
 * @returns 
 */
exports.removeGoodsImg = async function (goodsId, imgId) {
    const img = await Img.findByPk(imgId);
    const goods = await Goods.findByPk(goodsId);
    console.log("图片Id",imgId)
    await Img.destroy({
        where: {
            id: imgId
        }
    });
    goods.removeImg(img);
    return img;
}

exports.filter = async function (username, condition, limit, page) {
    return await Goods.findAndCountAll({
        include: {
            model: SubCategory,
            attributes: [],
            include: {
                model: Category,
                attributes: []
            }
        },
        where: {
            username,
            ...getVaildCondition(condition)
        },
        attributes: {
            exclude: ["createdAt", "updatedAt", "username", "subCategoryId"],
            //使用Sequelize.col手动引入联表引入的属性并为其取别名
            include: [
                [Sequelize.col("sub_category.name"), "subCategory"],
                [Sequelize.col("sub_category.category.name"), "category"]
            ]
            // include : ["category.name"]
        },
        limit: +limit,
        offset: (+page - 1) * +limit,
        order: ["id"]
    })
}

/**
 * 用于获取符合where配置格式的数据
 * @param { Object } condition 需要筛选的条件数据 例如 { keyword : "与", }
 * @returns 
 */
function getVaildCondition(condition) {
    const {
        keyword = "", category = "",
            subCategory = ""
    } = condition;
    const filterCondition = {
        keyword: {
            field: "title",
            condition: {
                [Op.like]: "%" + keyword + "%"
            }
        },
        category: {
            field: "$sub_category.category.name$",
            condition: category
        },
        subCategory: {
            field: "$sub_category.name$",
            condition: subCategory
        }
    }
    const where = {};
    for (const key in condition) {
        //如果为空则默认为所有
        if (condition[key] == "") {
            continue;
        }
        where[filterCondition[key].field] = filterCondition[key].condition;
    }
    return where;
}