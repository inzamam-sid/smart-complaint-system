const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {validateSignUpData} = require('../utils/validation');

const authRouter = express.Router();


// Sign up Route 

authRouter.post("/signup", async (req, res) => {
    try{
        const { firstName , lastName, emailId, password, role, department } = req.body;
        validateSignUpData(req);

        const emailLower = emailId.toLowerCase();


        // Check if all required fields are present
        if (!firstName || !lastName || !emailId || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the role is valid
        // const validRoles = ['student', 'faculty', 'admin'];
        // if (!validRoles.includes(role)) {
        //     return res.status(400).json({ message: "Invalid role" });
        // }
        
          if (role === "student" && !emailLower.endsWith("@student.iul.ac.in")) {
          return res.status(403).json({ message: "Student email must end with @student.iul.ac.in" });
       }

         if (role === "faculty") {
         if (!emailLower.endsWith("@iul.ac.in") || emailLower.endsWith("@student.iul.ac.in")) {
           return res.status(403).json({ message: "Invalid faculty email domain" });
           }
        }


        // Check if user already exists
        const existingUser = await User.findOne({ emailId})
        if( existingUser ){
            return res.status(400).json({ message: "User already exists"})
        }

        // Hast the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const newUser = new User({
            firstName,
            lastName, 
            emailId,
            password: hashedPassword,
            role,
            department
         })

         const savedUser = await newUser.save();

          const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "8h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(201).json({ message: "User added successfully", data: savedUser });
       
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})


// Login route
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid Credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json(user);

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Logout route
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully");
});

module.exports = authRouter;

