const sequelize = require("./sequelize");
const {
    DataTypes
} = require("sequelize");

const Img = sequelize.define("img",{
    src : {
        type : DataTypes.STRING(1000),
        allowNull : false
    }
});

module.exports = Img;