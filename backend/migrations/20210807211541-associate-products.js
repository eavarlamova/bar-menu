'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Products',
      'users_id',
      {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users', // модель, с которой будет связываться
          key: 'id' // ключ, по которому искать соответствие в модели юзерс 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
