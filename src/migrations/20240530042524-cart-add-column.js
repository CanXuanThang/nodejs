"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.addColumn("carts", "size", {
        type: Sequelize.STRING,
        defaultValue: false,
      }),

      await queryInterface.addColumn("carts", "color", {
        type: Sequelize.STRING,
        defaultValue: false,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      await queryInterface.removeColumn("carts", "size"),
      await queryInterface.removeColumn("carts", "color"),
    ];
  },
};
