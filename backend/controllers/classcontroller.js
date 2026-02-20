const { Model, where } = require("sequelize");
const db = require(process.env.Root_Path+"/db/models");
const { Class, students, sequelize } = db;
const { Op } = require("sequelize");


const createClass = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { className, section } = req.body;

        if (!className || !section) {
            await t.rollback();
            return res.status(400).send({
                error: true,
                message: "class_name and section are required"
            });
        }

        const classeData = await Class.create({
            class_name: className,
            section: section,

        },
            { transaction: t }
        )
        await t.commit();

        return res.status(200).send({
            success: true,
            message: "Classes added successfully",
            data: classeData
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

        console.error("Create classes Error:", error);

        return res.status(500).send({
            error: true,
            message
        });
    }

}

// Update the class

const updateClass = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const classId = req.params.id;
        const { className, section } = req.body;
        const updatedClassesdata = await Class.update({
            class_name: className,
            section: section
        },
        
        {
            where: {
                class_id: classId,

            },
            transaction: t

        }
    
    );

    await t.commit();

        return res.status(200).json({
            message: "Class updated successfully",
            data: { classId,className,section }
        });


    } catch (error) {
         await t.rollback();
        return res.status(500).json({
            message: "Something went wrong during update",
            error: error.message
        });
    }

}


// Delete the Classes

const destroyClass = async (req, res) => {
    try {
        const classId = req.params.id;

        // Delete the class
        const deleted = await Class.destroy({
            where: { class_id: classId }
        });

        if (deleted === 0) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Class deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong during delete",
            error: error.message
        });
    }
};

// Get All List Data

const getListData = async (req, res) => {
  try {
    const listData = await Class.findAll({
      attributes: ["class_id", "class_name", "section"],
      order: [["class_name", "ASC"]]
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





module.exports = { createClass , updateClass ,destroyClass,getListData}
