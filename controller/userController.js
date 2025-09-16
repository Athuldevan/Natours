function getAllUsers(req, res) {
  console.log('url is not created yet..');
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
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
