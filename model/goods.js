const sequelize = require("./sequelize");
const {
    DataTypes
} = require("sequelize");
const Goods = sequelize.define("goods", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price_off: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sales: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // categoryId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    
    // },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subCategoryId : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
});

module.exports = Goods;
