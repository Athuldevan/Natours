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

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
