const Goods = require("./goods");
const User = require("./user");
const Category = require("./category");
const Tag = require("./tag");
const Img = require("./img");
const subCategory = require("./sub_category");
const SubCategory = require("./sub_category");

//一个user对应多个goods，一个goods对应一个user
User.hasMany(Goods, {
    sourceKey: "username",
    foreignKey: "username"
});
Goods.belongsTo(User, {
    targetKey: "username", //更改引用的外键
    foreignKey: "username" //更改外键名
});


// 一个tags可以对应多个goods,一个goods可以对应多个tags
Goods.belongsToMany(Tag, {
    through: "goods_tag",
    timestamps: false
});
Tag.belongsToMany(Goods, {
    through: 'goods_tag',
    timestamps: false
});


// 一个goods对应一个image，一个image对应一个goods，但需要利用附表来记录他们的关系
Goods.belongsToMany(Img, {
    through: "goods_img",
    // foreignKey: "goodsId"
    timestamps: false
});
Img.belongsToMany(Goods, {
    through: "goods_img",
    // foreignKey: "goodsId"
    timestamps: false
});

//一个category对应多个sub_category，一个sub_category对应一个category
Category.hasMany(subCategory);
subCategory.belongsTo(Category);

//一个category对应一个img，一个img对应一个category
Img.hasOne(Category);
Category.belongsTo(Img);


// 一个goods对应一个sub_category，一个sub_category可以对应多个goods
Goods.belongsTo(SubCategory);
SubCategory.hasMany(Goods);