"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("users", "avatar", {
      type: Sequelize.STRING,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("users", "avatar");
  },
};
