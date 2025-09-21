const jwt = require('jsonwebtoken');

const User = require('../models/userModal');

//Sign up
async function signup(req, res) {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    //Creating a web token
    const token = jwt.sign({ id: user._d }, process.env.JWT_SECRET_KEY);

    res.status(201).json({
      status: 'message',
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
}

// Login api
async function login(req, res) {
  try {
    const { password, email } = req.body;

    // 1) Checking for the user.
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Login failed...No such user found..');

    // 2) checking wheather the password id valid.
    const isPasswordValid = await user.isPasswordCorrect(
      password,
      user?.password,
    );

    if (isPasswordValid) {
      res.status(200).json({
        status: 'success',
        data: 'Logined succesfully',
      });
    } else {
      throw new Error('Invalid Login credentials');
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
}

module.exports = { signup, login };
