'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.BIGINT
      },
      transactionType: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};