'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    static associate(models) {

      students.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'classes'
      });

      students.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'roles'
      });
    }
  }

  students.init(
    {
      student_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      roll_no: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Others'),
        allowNull: false,
        defaultValue: 'Male',
      },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false
      },

      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Class',
          key: 'class_id',
        },
      },

      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Role",
          key: "role_id"
        }

      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'students',
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  return students;
};
