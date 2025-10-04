const crypto = require('node:crypto')
const jwt = require('jsonwebtoken');
const User = require('../models/userModal');
const sendEmail = require('../utils/email');
//Sign up
async function signup(req, res) {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const user = await User.create({ name, email, password, passwordConfirm });

    //Creating a JWT web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '90d',
    });

    res.status(201).json({
      status: 'success',
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
    // 1) Checking if email and password exist.
    if (!email || !password)
      throw new Error('No user and email an d password exists.');

    // 2) checking is user exixts &&  wheather the password id valid.
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User dosent exisit');
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!user || !isPasswordValid)
      throw new Error('Incorrect Email or password');

    //3) if everything is ok send TOKEN to the client

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '90d', // optional
    });

    res.status(200).json({
      token, //Sending token to the client
      status: 'success',
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
}

async function protect(req, res, next) {
  try {
    // 1) Getting a token and checking if it is there

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    if (!token) {
      return res.status(403).json({
        status: 'failed',
        message: 'You are not logged in please logg in',
      });
    }

    // 2) Veriification of  token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) if Ok check if the user exist or not
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(400).json({
        status: 'failed',
        message:
          'The user belonging to this token does no longer exist and user does not exist',
      });
    }
    //4) check if the user changed the password after the token is issued or verified
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(400).json({
        status: 'faield',
        message: 'user recently changed the password.Please Login again',
      });
    }
    //Grant access to protected route
    req.user = currentUser;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      status: 'failed',
      message: err.message,
    });
  }
}

//Authorization middleware
function restrictTo(...roles) {
  return (req, res, next) => {
    //roles is an array ['admin', 'guit]
    if (roles.includes(req.user.role) === false) {
      return res.status(403).json({
        status: 'failed',
        message: 'You dont have permission to perform these action',
      });
    }

    res.status(200).json({
      status: 'sucess',
      message: 'succesfully deleted the tour',
    });
    next();
  };
}

//FORGOT
//  PASSWORD
async function forgotPassword(req, res) {
  console.log('🔥 forgotPassword route hit');

  try {
  

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
     
      return res
        .status(404)
        .json({ status: 'failed', message: 'No such user found' });
    }

   

    // Generate reset token
    const resetPasswordToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

 

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetPasswordToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}\n\nIf you didn't request a password reset, please ignore this email.`;

  

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });


    return res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
    
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
}

//RESET password
const resetPassword = async function (req, res, next) {
  try {
    const hasedToken =  crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    // 1) Getting the user based on the toke
    const user = await User.findOne({
      passwordResetToken: hasedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });
    // 2) If token has not expired and there  is a user , set new password

    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'token expired' });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.password;

    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '90d',
    });
    //3)update the changedPasword property for the cureent user;
    //4)log the user in

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
module.exports = {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
};
