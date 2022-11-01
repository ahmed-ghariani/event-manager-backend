const express = require('express');
const {auth,hasRole} = require('../auth/auth');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.route("/")
    .get(auth,eventController.getAll)
    .post(auth,hasRole('admin'),eventController.add);

router.route("/:id")
    .get(auth,eventController.getById)
    .put(auth,hasRole('admin'),eventController.update)
    .delete(auth,hasRole('admin'),eventController.delete);
    
module.exports = router;