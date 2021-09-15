const Category = require("../model/category");
const SubCategory = require("../model/sub_category");
const Img = require("../model/img");
/**
 * 获取所有的类目
 * @returns 
 */
exports.getAllCategory = async function () {
    return await Category.findAll({
        include: [{
            model: SubCategory,
            attributes: ["id", "name"]
        }, {
            model: Img,
            attributes: ["id", "src"]
        }],
        attributes: ["id", "name"],
    });
}

/**
 * 根据类Id获取信息
 * @param {*} categoryId
 * @returns 
 */
exports.getCategoryById = async function (categoryId) {
    return await Category.findByPk(categoryId, {
        include: [{
            model: SubCategory,
            attributes: ["name", "id"]
        }, {
            model: Img,
            attributes: ["id", "src"]
        }],
        attributes: ["id", "name"]
    })
}
// /**
//  * 获取所有类目及子类目
//  * @returns 
//  */
// exports.getAllCategoryAndSub = async function () {
//     return await Category.findAll({
//         include: {
//             model: SubCategory,
//             attributes: ["name", "id"]
//         },
//         attributes: ["name"],
//     });
// }


// /**
//  * 获取类目下的所有子类目
//  * @param {*} categoryId 需要得到子类目的类目的ID
//  */
// exports.getSubCategory = async function (categoryId) {
//     return await SubCategory.findAll({
//         where: {
//             categoryId
//         },
//         attributes: ["name", "id"]
//     })
// }

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
 * @param { Object } categoryInfo 类信息对象
 * @returns 
 */
exports.updateCategory = async function (categoryInfo) {
    const {
        id,
        name,
        img,
        newSubCategories = [],
    } = categoryInfo
    await Category.update({
        name,
        imgId: img.id
    }, {
        where: {
            id
        }
    });

    await SubCategory.bulkCreate(newSubCategories.map(val => ({
        name: val,
        categoryId: id
    })));
};

exports.createCategory = async function (categoryInfo) {
    const {
        name,
        img,
        newSubCategories = []
    } = categoryInfo
    console.log(categoryInfo);
    const result = await Category.create({
        name,
        imgId: img.id
    });
    const { id } = JSON.parse(JSON.stringify(result));
    // console.log(data.id);
    await SubCategory.bulkCreate(newSubCategories.map(val => ({
        name: val,
        categoryId: id
    })));
    return id;
}

/**
 * 根据子类Id删除子类
 * @param {*} id 子类ID
 * @returns 
 */
exports.removeSubCategory = async function (id) {
    return await SubCategory.destroy({
        where: {
            id
        }
    });
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
    await SubCategory.bulkCreate(subCategories.map(val => ({
        name: val,
        categoryId
    })))
    return true;
}