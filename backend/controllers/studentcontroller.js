// controllers/studentController.js

const { Model, where } = require("sequelize");
const db = require(process.env.Root_Path+"/db/models");
const { Class, students, sequelize } = db;
const { Op } = require("sequelize");
const sendEmail=require(process.env.Root_Path+"/services/emailServices");
const bcrypt = require('bcryptjs');

// Create Students

const createStudents = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      name,
      email,
      phone,
      gender,
      address,
      rollno,
      dob,
      classid
    } = req.body;

    if (!name || !email || !rollno) {
      await t.rollback();
      return res.status(400).send({
        error: true,
        message: "name, email, rollno are required."
      });
    }

    const existing = await students.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { roll_no: rollno }
        ]
      }
    });

    if (existing) {
      await t.rollback();
      return res.status(400).send({
        error: true,
        message:existing.email === email
        ? "Email already exists"
        : "Roll Number already exists"
      });
    }

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || null;
    const randomStudentpassword=name.substring(0,4)+"@"+dob.substring(6,9)+"#";
    const hashpassword = await bcrypt.hash(randomStudentpassword, 10);
  
    const student = await students.create(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        roll_no: rollno,
        dob,
        gender,
        phone,
        address,
        password:hashpassword,
        class_id: classid,
        role_id:2
      },
      { transaction: t }
    );

    await t.commit();

   sendEmail(
    email,
    "Welcome to Our Student Portal!",
    "student.ejs",
    {email,randomStudentpassword}
);
    return res.status(201).send({
      success: true,
      message: "Student added successfully",
      data: student
    });

  } catch (error) {
    await t.rollback();

    return res.status(500).send({
      error: true,
      message: error.message || "Something went wrong"
    });
  }
};


// Update Students

const updateStudents = async (req, res) => {
  try {
    const studentId = req.params.id;
    const {
      name,
      email,
      phone,
      gender,
      address,
      rollno,
      dob,
    } = req.body;

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || null;

    const studentsUpdate = await students.update(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        roll_no: rollno,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
      },
      {
        where: {
          student_id: studentId
        }
      }
    );

    return res.status(200).json({
      message: "Student updated successfully",
      data: studentsUpdate
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong during update",
      error: error.message
    });
  }
};


// Create ClassesData

const getClassesData = async (req, res) => {
  try {
    const allClasses = await Class.findAll({
      attributes: ["class_id", "class_name", "section"]
    });

    res.send({
      success: true,
      message: "Classes fetched successfully",
      data: allClasses
    });


  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message
    })

  }

}

// All Class And Students Data Students Details 


const studentDetails = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await students.findOne({
      where: { student_id: studentId },
      include: [
        {
          model: Class,
          as: 'classes',
          attributes: ['class_name', 'section']
        }
      ]
    })

    if (!studentData) {
      return res.status(404).json({ message: "Student id not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Student Details Data Get Successfully",
      data: studentData
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching details",
      error: error.message
    });

  }
}

// Get All List Data

const getStudentslist=async(req,res)=>{

  try {
    let studentslistdata=await students.findAll({
      include:[
        {
          model:Class,
           as: "classes"
        }

      ]
    })
       return res.status(200).json({
      success: true,
      data: studentslistdata
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error
    });
    
  }

}


module.exports = {
  createStudents, getClassesData, studentDetails ,updateStudents , getStudentslist
};
