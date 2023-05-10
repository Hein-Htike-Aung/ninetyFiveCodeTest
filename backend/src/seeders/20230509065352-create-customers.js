"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("customers", [
      {
        username: "admin_user",
        password: "admin123!@#",
        email: "admin@gmail.com",
        phoneNo: "092343243",
        borrowed_count: 2,
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        username: "admin_user2",
        password: "admin123!@#",
        email: "admin2@gmail.com",
        phoneNo: "09234324334",
        borrowed_count: 1,
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        username: "admin_user3",
        password: "admin123!@#",
        email: "admin3@gmail.com",
        phoneNo: "09236743243",
        borrowed_count: 3,
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
