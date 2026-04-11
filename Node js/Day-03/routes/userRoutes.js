const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validator');

router.post('/signup', validate(schemas.signup), authController.signup);
router.post('/login', validate(schemas.signin), authController.login);
router.get('/verify/:token', authController.verifyEmail);

module.exports = router;
