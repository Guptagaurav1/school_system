'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    static associate(models) {
      // Student belongs to a Class
      students.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'classes'
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
      paranoid: true, // deleted_at automatically
    }
  );

  return students;
};
