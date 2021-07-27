const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize")
const SubCategory = sequelize.define("sub_category",{
     name : {
         type : DataTypes.STRING,
         allowNull : false
     },
     categoryName : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

module.exports = SubCategory;