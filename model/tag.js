const sequelize = require("./sequelize");
const {
    DataTypes
} = require("sequelize");

const Tag = sequelize.define("tag",{
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

module.exports = Tag;