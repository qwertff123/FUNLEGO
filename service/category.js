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
 * @param {*} category 类目
 */
exports.getSubCategory = async function(category){
    return await SubCategory.findAll({
        where :{
            categoryName : category
        },
        attributes : ["name","id"]
    })
}


