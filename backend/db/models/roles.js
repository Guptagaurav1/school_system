'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "role_id",
        as: "user",
      });

      Role.hasMany(models.students, {
        foreignKey: "role_id",
        as: "students",
      })
    }
  }
  Role.init({
    role_id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },


    status: {
      type: DataTypes.STRING,
      allowNull: false,
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
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
  }, {
    sequelize,
    modelName: "Role",
    tableName: 'roles',
     underscored: true,   
      timestamps: true,      
      paranoid: true,      
  });
  return Role;
};