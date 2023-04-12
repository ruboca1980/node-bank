const express = require('express');

const authController = require('../controllers/auth.controller');

//middlewares
const validations = require('./../middlewares/validations.middleware');

const router = express.Router();

router.post('/signup', validations.createUserValidation, authController.signup);

module.exports = router;
