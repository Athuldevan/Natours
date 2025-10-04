const express = require('express');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,

  protect,
} = require('../controller/authController');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
} = require('../controller/userController');

const router = express.Router();
router.route('/').get(getAllUsers).post(createUser);
router.route('/updateProfile').patch(protect, updateMe);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//signup and login
router.route('/signup').post(signup);
router.route('/login').post(login);




router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(protect, resetPassword);

module.exports = router;
