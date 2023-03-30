const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validate')
const {login} = require('../../app/validations/authValidation')
const AuthController = require('../../app/controllers/AuthController');

router.post('/login',validate(login), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.requestRefreshToken);

module.exports = router;