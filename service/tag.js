const Tag = require("../model/tag");
const Goods = require("../model/goods");
const Sequelize = require("sequelize");
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
exports.getTags = async function(goodsId){
    const result = await Goods.findOne({
        include : {
            model : Tag,
            attributes : ["name"],
            through : {
                attributes:[]
            }
        },
        attributes : ["tags.name"],
        where : {
            id : goodsId
        }
    });
    return result;
}