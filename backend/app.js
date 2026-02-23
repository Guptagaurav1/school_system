const express = require("express");
const cors = require("cors");
const {  sequelize, connectDB  } = require(process.env.Root_Path+"/config/db.config.js");
const studentRoutes =require(process.env.Root_Path+"/routes/studentsRoutes.js");
const classRoutes=require(process.env.Root_Path+"/routes/classRoutes.js");
const authRoutes=require(process.env.Root_Path+"/routes/authRoutes.js");
const authstudentRoutes=require(process.env.Root_Path+"/routes/studentauthRoutes.js");
const roleRoutes=require(process.env.Root_Path+"/routes/rolesRoutes.js");
const userRoutes=require(process.env.Root_Path+"/routes/userRoutes.js")


const app = express();
app.use(
  cors({
    origin: process.env.Frontend_server,
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],               
  })
);
app.set('view engine', 'ejs');
app.use(express.json());


app.use("/api/students", studentRoutes);
app.use('/api/class', classRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/user', userRoutes);



app.use('/api/authentication', authRoutes);

// Students Authentication 

app.use("/api/studentAuth", authstudentRoutes);




connectDB;

sequelize.sync()


module.exports = app;