const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("Transactions", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  amount:{
    type: Sequelize.BIGINT
  },
  transactionType:{
    type: Sequelize.STRING
  },
  partyName:{
    type: Sequelize.STRING,
  },
  userId:{
    type: Sequelize.INTEGER,
    references: { model: 'Users', key: 'id' },
    onUpdate:'CASCADE',
    onDelete:'SET NULL',
  },
},{
    timestamps:true,
});