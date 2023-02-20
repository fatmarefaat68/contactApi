const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all field required");
  }

  const findingUser = await User.findOne({ email });
  if (findingUser) {
    return res.status(400).send("email is already registered");
  }

  // const hasedPassword = bcrypt.hash(password, 10);

  const saltRounds = 10;
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      console.log("salted is ok");
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      console.log("password is hashed");

      //#########################3
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      user.save();
      res.status(201).json({ username: user.username, email: user.email });
    });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  const stat = await bcrypt.compare(password, user.password);
  if (user && stat) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    return res.status(401).send("invalid email or password");
  }
});

//@desc  user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
