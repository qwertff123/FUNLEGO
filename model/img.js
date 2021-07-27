const sequelize = require("./sequelize");
const {
    DataTypes
} = require("sequelize");

const Img = sequelize.define("img",{
    src : {
        type : DataTypes.STRING(1000),
        allowNull : false
    },
    goodsId : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
});

module.exports = Img;