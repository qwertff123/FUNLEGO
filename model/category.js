const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category",{
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    imgSrc : {
        type : DataTypes.STRING(2000),
        allowNull : false
    }
},{
    timestamps : false
});

module.exports = Category;