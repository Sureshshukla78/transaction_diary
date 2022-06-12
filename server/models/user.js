const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("Users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  Name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING,
  },
},{
    timestamps:true,
});