const Goods = require("./goods");
const User = require("./user");
const Category = require("./category");
const Tags = require("./tag");
const Img = require("./img");
const subCategory = require("./sub_category");
const SubCategory = require("./sub_category");

//一个user对应多个goods，一个goods对应一个user
// User.hasMany(Goods,{
//     sourceKey : "username",
//     foreignKey : "username"
// });
Goods.belongsTo(User,{
    targetKey : "username",     //更改引用的外键
    foreignKey : "username"     //更改外键名
});


//一个goods对应一个category，一个category可对应多个goods
// Category.hasMany(Goods);
// Goods.belongsTo(Category);

// 一个tags可以对应多个goods,一个goods可以对应多个tags
Goods.belongsToMany(Tags,{through : "goods_tag"});
Tags.belongsToMany(Goods,{through : 'goods_tag'});

// 一个goods对应一个image，一个image对应一个goods
Goods.hasMany(Img);
Img.belongsTo(Goods,{
    foreignKey : "goodsId"
});

//一个category对应多个sub_category，一个sub_category对应一个category
Category.hasMany(subCategory);
subCategory.belongsTo(Category);

// 一个goods对应一个sub_category，一个sub_category可以对应多个goods
Goods.belongsTo(SubCategory);
SubCategory.hasMany(Goods);



