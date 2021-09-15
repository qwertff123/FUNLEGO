const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category",{
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    imgId : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
},{
    timestamps : false
});

module.exports = Category;