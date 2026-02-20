'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      student_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      roll_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Others"),
        defaultValue: "Male",
        allowNull: false
      },

      class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "classes",
          }
          ,
          key: "class_id"
        }

      },

      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "roles",
          }
          ,
          key: "role_id"
        }

      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false

      },
      address: {
        type: Sequelize.STRING,
        allowNull: false

      },
      created_by: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.INTEGER
      },

      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};