/**
 * 用作测试，生成随机的商品信息
 */
const Goods = require("./model/goods");
const Mock = require("mockjs");
const obj = Mock.mock({
    "goods|30" : [{
        title : "@ctitle(3, 9)",
        desc : "@csentence(8, 20)",
        "price|3000-5000" : 66,
        "price_off|1-2999" : 66,
        "unit" : "@cword(1)",
        "issale|1-1" : true,
        "inventory|50-250" : 66,
        "sales|100-999" : 666,
        "username|1" :["88","qwertff","趣味"] ,
        "subCategoryId|1-6" : 2
    }]
});
// console.log(obj.goods)
Goods.bulkCreate(obj.goods);