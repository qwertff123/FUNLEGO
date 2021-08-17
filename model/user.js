const sequelize = require("./sequelize");
const {
    DataTypes
} = require("sequelize");

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey : true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    admin : {
        type : DataTypes.BOOLEAN,
        defaultValue : 0
    }
});

module.exports = User;
