const {DataTypes, Sequelize} = require('sequelize')
const database = require('../database/database')

const User = database.define('User', ({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    name  :{ 
        type : DataTypes.STRING,
        allowNull : false
    }
}))


module.exports = User