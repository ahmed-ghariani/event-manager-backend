const userController = require('../controllers/userController');
const express = require('express');
const {auth,hasRole} = require('../auth/auth');
const router = express.Router();

router.route("/login").post(userController.login);
router.route("/add").post(auth,hasRole('admin'),userController.add);

module.exports = router;