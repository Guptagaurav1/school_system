const express = require("express");
const cors = require("cors");
const {  sequelize, connectDB  } = require("./config/db.config.js");
const studentRoutes =require("./routes/students.routes.js");
const classRoutes=require("./routes/class.routes.js");
const authRoutes=require("./routes/authRoutes.js");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use('/api/class', classRoutes);
app.use('/api/authentication', authRoutes);



connectDB;

sequelize.sync()


module.exports = app;