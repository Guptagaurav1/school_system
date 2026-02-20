const db = require(process.env.Root_Path +"/db/models");
const { Role, User } = db
const sendEmail = require(process.env.Root_Path+"/services/emailServices");
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

const CreateUser = async (req, res) => {
    try {
        const { userName, RoleId, email } = req.body;

        if (!userName || !email || !RoleId) {
            return res.status(400).send({
                error: true,
                message: "username, email, Roleid are required."
            });
        }

        // Check if email already exists in USER table
        const existing = await User.findOne({
            where: { email }
        });

        if (existing) {
            return res.status(400).send({
                error: true,
                message: "Email already exists"
            });
        }

        // Generate password
        const usernamePart = userName.substring(0, 3);
        const emailPart = email.substring(4, 9);
        const randomStudentpassword = `${usernamePart}@${emailPart}#`;

        const hashpassword = await bcrypt.hash(randomStudentpassword, 10);

        // Create user
        const roleCreate = await User.create({
            name: userName,
            email: email,
            role_id: RoleId,
            password: hashpassword
        });

        // Send email
        sendEmail(
            email,
            "Welcome to Our Student Portal!",
            "usertemplate.ejs",
            { userName, email, randomStudentpassword }
        );

        return res.status(201).send({
            success: true,
            message: "User added successfully",
            data: roleCreate
        });

    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error.message || "Something went wrong From Server"
        });
    }
}

module.exports = { CreateUser }
