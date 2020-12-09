'use strict';

const {validationResult} = require('express-validator');
const postModel = require('../models/postModel');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta');

const posts = postModel.posts;

const post_list_get = async (req, res) => {

    try {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

const post_get = async (req, res) => {

    try {
        const id = req.params.id;
        const post = await postModel.getPost(id);
        res.json(post);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

const create_post = async (req, res) => {
    console.log(req.body, req.file);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    const {Description, CreationDate} = req.body;
    const params = [Description, CreationDate, req.file.filename];

    try {
        const post = await postModel.addPost(params);

        res.json({message: 'upload ok'});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

const post_update_put = async (req, res) => {
    console.log('post_update_put', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {Description, PostId} = req.body;
    const params = [Description, PostId];

    try {
        const post = await postModel.updatePost(params);
        res.json({message: 'ok'});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

const post_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await postModel.deletePost(id);
        res.json(post);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

const make_thumbnail = async (req, res, next) => {

    try {
        const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
        console.log('thumbnail', thumbnail);
        if (thumbnail) {
            next();
        }
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};


module.exports = {
    post_list_get,
    post_get,
    create_post,
    post_update_put,
    post_delete,
    make_thumbnail,
};