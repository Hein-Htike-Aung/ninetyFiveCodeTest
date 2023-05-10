"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("books", [
      {
        name: "Nice one",
        category: "Astronomy",
        issued_date: "2000-05-01 21:22:46.340000",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        name: "Nice Two",
        category: "Biology",
        issued_date: "2000-05-01 21:22:46.340000",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        name: "Nice Three",
        category: "Psychology",
        issued_date: "2000-05-01 21:22:46.340000",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        name: "Nice Four",
        category: "Comic",
        issued_date: "2000-05-01 21:22:46.340000",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
