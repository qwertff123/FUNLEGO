const Category = require("../model/category");
const SubCategory = require("../model/sub_category");
/**
 * 获取所有的类目
 * @returns 
 */
exports.getAllCategory = async function(){
    return await Category.findAll({
        attributes : ["name"]
    });
}



/**
 * 获取类目下的所有子类目
 * @param {*} categoryId 类目Id
 */
exports.getSubCategory = async function(categoryId){
    return await SubCategory.findAll({
        where :{
            categoryId
        },
        attributes : ["name","id"]
    })
}


