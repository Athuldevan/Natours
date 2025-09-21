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
router.route('/signup').post(signup);
router.route('/login').post(login)

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
