const express = require('express');
const { signup, login } = require('../controller/authController');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');

const router = express.Router();
router.route('/').get(getAllUsers).post(createUser);

router.route('/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

//signup and login
router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router;
