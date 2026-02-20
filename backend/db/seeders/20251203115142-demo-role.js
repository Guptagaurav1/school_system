'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        role_id: 1,
        role_name: "admin",
        full_name: "Admin",
        status: "active",
       
      },
      {
        role_id: 2,
        role_name: "employee",
        full_name: "Employee",
        status: "active",
        
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { role_name: ["admin", "employee"] }, {});
  }
};
