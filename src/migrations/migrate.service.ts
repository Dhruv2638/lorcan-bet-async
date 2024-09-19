'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Categories table
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Create Product_Categories join table
    await queryInterface.createTable('Product_Categories', {
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Add unique constraint to Product_Categories table
    await queryInterface.addConstraint('Product_Categories', {
      fields: ['product_id', 'category_id'],
      type: 'unique',
      name: 'unique_product_category',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop Product_Categories table first
    await queryInterface.dropTable('Product_Categories');
    // Drop Categories table
    await queryInterface.dropTable('Categories');
  },
};
