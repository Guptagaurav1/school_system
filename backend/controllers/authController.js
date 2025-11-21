const db = require("../db/models");
const { Admin } = db;
const bcrypt = require("bcryptjs");
const { generateTokens } = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");


// Login function

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.password)
            return res.status(500).json({ message: "Password not set for this user" });

        let matchPassword;
        try {
            matchPassword = await bcrypt.compare(password, user.password);
        } catch (err) {
            return res.status(500).json({ message: "Error comparing password", error: err.message });
        }

        if (!matchPassword) return res.status(400).json({ message: "Wrong password" });

        if (user.name !== "admin") {
            return res.status(403).json({ message: "Access denied: only admins can log in" });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        const allAdmins = await Admin.findAll({
            attributes: { exclude: ["password"] },
        });

        res.json({
            message: "Login success",
            allAdmins,
            accessToken,
            refreshToken,
        });

    } catch (error) {
        console.log("Login catch:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


// Refresh function

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken)
            return res.status(401).json({ message: "Refresh token required" });

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await Admin.findByPk(decoded.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        res.json({ message: "New access token generated", accessToken });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
};


module.exports = { login, refresh };
