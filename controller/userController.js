const User = require('../models/userModal');

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(201).json({
      status: 'success',
      data: { users },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
    });
  }
}
function createUser(req, res) {
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
function updateUser(req, res) {
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
function getUser(req, res) {
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
function deleteUser(req, res) {
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

//upate user profile
async function updateMe(req, res) {
  try {
    const { name, email } = req.body;

    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'failed',
        message: 'You cant update the user and password field in this route.',
      });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No such user exists',
      });
    }

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
}

//Delete user profiel
async function deleteMe(req, res) {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(203).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Succes',
      message: err.message,
    });
  }
}
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
};
