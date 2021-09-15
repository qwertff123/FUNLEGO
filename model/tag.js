const sequelize = require("./sequelize");
const {
    DataTypes, INTEGER
} = require("sequelize");

const Tag = sequelize.define("tag",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    }
},{
    updatedAt : false
});

module.exports = Tag;