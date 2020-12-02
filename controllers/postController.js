'use strict';

const { validationResult } = require('express-validator');
const postModel = require('../models/postModel');

const posts = postModel.posts;

const post_list_get = async (req, res) => {
    const posts = await postModel.getAllPosts();
    res.json(posts);
};

const post_get = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.getPost(id);
    res.json(post);
};

const create_post = async (req, res) => {
    console.log(req.body, req.file);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {Description, CreationDate, PicturePath} = req.body;
    const params = [Description, CreationDate, PicturePath];

    const post = await postModel.addPost(params);

    res.json({message: 'upload ok'});
}

const post_update_put = async (req, res) => {
    console.log('post_update_put', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {Description} = req.body;
    const params = [Description];

    const post = await postModel.addPost(params);

    res.json({message: 'ok'});
}

const post_delete = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.deletePost(id);
    res.json(post);
};



module.exports = {
    post_list_get,
    post_get,
    create_post,
    post_update_put,
    post_delete,
};