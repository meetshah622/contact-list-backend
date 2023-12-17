const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Create user
//@route POST /user/register
//@access Public
const createUser = asyncHandler(async (req, res) => {
  console.log("req", req);
  const { email, username, password } = req?.body;
  if (!email || !username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  console.log("userAvailable", userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered");
  }
  //Hashpassword
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword", hashedPassword);
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user?._id,
      email: user?.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login user
//@route POST /user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Login data is missing");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user?.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          email: user?.email,
          username: user?.username,
          id: user?._id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "50m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is incorrect");
  }
  res.status(400).json({ message: "Login User" });
});

//@desc get Current user information
//@route GET /user/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  const userInfo = await User.findOne({ email: req?.user?.email });
  res.json({ user: userInfo });
});

module.exports = {
  createUser,
  loginUser,
  currentUser,
};
