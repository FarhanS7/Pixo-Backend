const User = require("../../models/User/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//User Controller
const userController = {
  //!Registration
  register: asyncHandler(async (req, res) => {
    //check if username already exist
    const { username, email, password } = req.body;
    const userFound = await User.findOne({ username });
    if (userFound) {
      throw new Error("User already exist");
    }

    //Hash The Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Register The User
    const userRegistered = User.create({
      username,
      email,
      password: hashedPassword,
    });
    //Send The Response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      userRegistered,
    });
  }),
  //!Login
};
