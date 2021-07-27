/**
 * 用作测试，生成随机的商品信息
 */
const getSrc = require("./mockImg");
const Goods = require("./model/goods");
const Img = require("./model/img");
const Mock = require("mockjs");

(async () => {

    /* 生成商品数据 */
    // const obj = Mock.mock({
    //     "goods|30": [{
    //         title: "@ctitle(3, 9)",
    //         desc: "@csentence(8, 20)",
    //         "price|3000-5000": 66,
    //         "price_off|1-2999": 66,
    //         "unit": "@cword(1)",
    //         "issale|1-1": true,
    //         "inventory|50-250": 66,
    //         "sales|100-999": 666,
    //         "username|1": ["88", "qwertff", "趣味"],
    //         "subCategoryId|1-6": 2,
    //     }]
    // });
    // Goods.bulkCreate(obj.goods);

    /* 生成图片数据 */
    // const fn = await getSrc();
    // let goodsIdList = await Goods.findAll({
    //     attributes: ["id"],
    //     raw: true
    // });
    // const imgs = goodsIdList.reduce((prev,goods) => {
    //     const src = fn(1, 3);
    //     src.forEach(val=>{
    //         prev.push({
    //             src : val,
    //             goodsId : goods.id
    //         })
    //     });
    //     return prev;
    // },[]);
    // Img.bulkCreate(imgs);
})();