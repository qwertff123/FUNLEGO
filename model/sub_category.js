const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize")
const SubCategory = sequelize.define("sub_category",{
     name : {
         type : DataTypes.STRING,
         allowNull : false
     },
     categoryId : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
});

module.exports = SubCategory;