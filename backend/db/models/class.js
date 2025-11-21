'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    
    static associate(models) {
      // A class has many students
      Class.hasMany(models.students, {
        foreignKey: 'class_id',
        as: 'students'
      });
    }
  }

  Class.init(
    {
        class_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      class_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section: {
        type: DataTypes.ENUM('A', 'B', 'C', 'D'),
        allowNull: false,
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
      modelName: 'Class',
      tableName:'classes',
      underscored: true,     // created_at, updated_at auto generate
      timestamps: true,      // automatic timestamps ON
      paranoid: true,        // deleted_at auto generate
    }
  );

  return Class;
};
