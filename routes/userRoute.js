'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/id:', userController.user_get);


router.post('/', [
    body('name', 'vähintään 3 merkkiä').isLength({min: 3}).escape(),
    body('email', 'kunnon sähköposti').isEmail(),
    body('passwd', 'vähintään 8 merkkiä ja sisältää isoja kirjaimia').matches(
        '(?=.*[A-Z]).{8,}'),
],userController.user_create_post);

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete users.');
});

module.exports = router;
