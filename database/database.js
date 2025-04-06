const { DataTypes, Sequelize } = require('sequelize')

const database = new Sequelize('sendemailuser', 'root', 'Sreekanth@123',({
    dialect : "mysql",
    logging : console.log
}))

module.exports = database