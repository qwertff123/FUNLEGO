const {
    Sequelize
} = require("sequelize");

const sequelize = new Sequelize({
    host : "localhost",
    username : "root",
    password : "1648494263.com",
    database : "funlego",
    dialect : "mysql"
});

module.exports = sequelize;