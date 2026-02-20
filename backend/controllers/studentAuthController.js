const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { generateTokens } = require(process.env.Root_Path+"/utils/generateTokens");

const { students,Role } = db;

const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find student
        const studentUser = await students.findOne({ where: { email } });

        if (!studentUser) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!studentUser.password) {
            return res.status(500).json({ message: "Password not set for this user" });
        }

        const matchPassword = await bcrypt.compare(password, studentUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Wrong password" });
        }

        if (studentUser.role_id !== 2) {
            return res.status(403).json({ message: "Access denied: only Students can log in" });
        }

        // Generate tokens

        const { accessToken, refreshToken } = generateTokens(studentUser);

        return res.json({
            message: "Student Login successful",
            accessToken,
            refreshToken,
            user: {
                id: studentUser.student_id,
                first_name: studentUser.first_name,
                last_name: studentUser.last_name,
                email: studentUser.email,
                role_id: studentUser.role_id,
            }
        });

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {studentLogin};
