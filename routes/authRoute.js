'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/register', [
    body('name', 'min. 3 characters').isLength({min: 3}).escape(),
    body('email', 'not a valid email').isEmail(),
    body('passwd', 'min. 8 and 1 uppercase character').matches(
        '(?=.*[A-Z]).{8,}'),
], userController.user_create_post, authController.login,);

module.exports = router;