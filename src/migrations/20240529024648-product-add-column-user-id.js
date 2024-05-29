"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("products", "user_id", {
      type: Sequelize.INTEGER,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("products", "user_id");
  },
};
