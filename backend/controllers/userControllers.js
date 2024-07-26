const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "3m" }
  );
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //  console.log("hash password",hashedPassword);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("user created successfully ", user);

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    // compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const currentUser = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
