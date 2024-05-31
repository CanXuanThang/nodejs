"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("carts", "quantity", {
      type: Sequelize.INTEGER,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("carts", "quantity");
  },
};
