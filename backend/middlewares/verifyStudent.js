const verifyStudent = async (req, res) => {
    try {
        if (req.user.role_id !== 2) {
            return res.status(403).json({ message: "Students Only" });
        }
        next();
    } catch (error) {

    }
}

module.exports = verifyStudent;