'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');
const postController = require('../controllers/postController');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({dest: './uploads/', fileFilter});

const injectFile = (req, res, next) => {
    if(req.file) {
        req.body.mimetype = req.file.mimetype;
    }
    next();
}

router.get('/', postController.post_list_get);

router.get('/:id', postController.post_get);

router.post('/', upload.single('post'), injectFile, [
    body('Description','vaadittu kenttä').isLength({min: 1}),

    body('mimetype', 'ei ole kuva').contains('image'),
], postController.post_create_post);

router.put('/', [
    body('Description','vaadittu kenttä').isLength({min: 1}),

], postController.post_update_put);

router.delete('/:id', postController.post_delete);


module.exports = router;