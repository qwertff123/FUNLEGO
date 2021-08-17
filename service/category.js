const Category = require("../model/category");
const SubCategory = require("../model/sub_category");
const Sequelize = require("sequelize");
/**
 * 获取所有的类目
 * @returns 
 */
exports.getAllCategory = async function () {
    return await Category.findAll({
        attributes: ["name"]
    });
}

/**
 * 获取所有类目及子类目
 * @returns 
 */
exports.getAllCategoryAndSub = async function () {
    return await Category.findAll({
        include: {
            model: SubCategory,
            attributes: ["name", "id"]
        },
        attributes: ["name"],
    });
}


/**
 * 获取类目下的所有子类目
 * @param {*} categoryId 需要得到子类目的类目的ID
 */
exports.getSubCategory = async function (categoryId) {
    return await SubCategory.findAll({
        where: {
            categoryId
        },
        attributes: ["name", "id"]
    })
}

/**
 * 新增类目
 * @param {*} category 类目
 * @returns 
 */
exports.addCategory = async function (category) {
    return await Category.create({
        name: category
    })
}

/**
 * 修改类目
 * @param {*} oldCategory 旧类名
 * @param {*} newCategory 新类名
 * @returns 
 */
exports.updateCategory = async function (oldCategory, newCategory) {
    return await Category.update({
        name: newCategory
    }, {
        where: {
            name: oldCategory
        }
    })
}

exports.createCategoryAndSub = async function (categoryInfo) {
    const {
        category,
        subCategories
    } = categoryInfo;
    let result = await Category.create({
        name: category,
    });
    result = JSON.parse(JSON.stringify(result));
    const categoryId = result.id;
    SubCategory.bulkCreate(subCategories.map(val=>({name : val,categoryId})))

    return true;
}