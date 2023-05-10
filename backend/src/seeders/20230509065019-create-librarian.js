"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    const adminPassword = bcrypt.hashSync("admin123!@#", salt);
    await queryInterface.bulkInsert("librarians", [
      {
        username: "admin_user",
        password: adminPassword,
        email: "admin@gmail.com",
        phoneNo: "092343243",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        username: "admin_user2",
        password: adminPassword,
        email: "admin2@gmail.com",
        phoneNo: "09234324334",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        username: "admin_user3",
        password: adminPassword,
        email: "admin3@gmail.com",
        phoneNo: "09236743243",
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
