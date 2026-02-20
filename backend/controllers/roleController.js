const { Model, where } = require("sequelize");
const db = require(process.env.Root_Path+"/db/models");
const { Role, sequelize } = db;
const { Op } = require("sequelize");


const createRole= async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { Role_name, Full_name } = req.body;

        if (!Role_name || !Full_name) {
            await t.rollback();
            return res.status(400).send({
                error: true,
                message: "Role Name and Full Name are required"
            });
        }

        const rolesData = await Role.create({
            role_name: Role_name,
            full_name: Full_name,

        },
            { transaction: t }
        )
        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Role added successfully",
            data: rolesData
        });

    }
    catch (error) {

        await t.rollback();

        let message = "Something went wrong";

        if (error?.errors && error.errors[0]?.message) {
            message = error.errors[0].message;
        } else if (error.message) {
            message = error.message;
        }

        console.error("Create roles Error:", error);

        return res.status(500).send({
            error: true,
            message
        });
    }

}

// Get All Roles

const getrolesList = async (req, res) => {
  try {
    const listData = await Role.findAll({
      attributes: ["role_id", "role_name", "full_name"],
     
      order: [["role_id", "ASC"]] 
    });

    return res.status(200).json({
      success: true,
      message: "Fetched all list data",
      data: listData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};



module.exports = { createRole , getrolesList }
