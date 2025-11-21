'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
    const password = "Gupta@1234";
    const hashpassword = await bcrypt.hash(password, 10);

    await queryInterface.bulkInsert('admins', [{
      name: 'admin',
      email: "gaurav.gupta@prakharsoftwares.com",
      password: hashpassword,
      role_id: 1,
      status: "active",
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
    await queryInterface.bulkDelete('admins', null, {});

  }
};
