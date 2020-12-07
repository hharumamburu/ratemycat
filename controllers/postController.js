'use strict';
const { validationResult } = require('express-validator');
const postModel = require('../models/postModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');


const post_list_get = async (req, res) => {
    const posts = await postModel.getAllPosts();
    await res.json(posts);
};

const post_get = async (req, res) => {
    const post = await postModel.getPost(req.params.id);
    await res.json(post[0]);
};

const create_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.send(errors.array());
    } else {
        try {
            // create thumbnail
            const thumb = await resize.makeThumbnail(req.file.path,
                'thumbnails/' + req.file.filename,
                { width: 160, height: 160 });
            console.log('thumb', thumb);
            let coords = [0, 0];

            try {
                // get coordinates
                coords = await imageMeta.getCoordinates(req.file.path);
                console.log('coords', coords);
            } catch (error) {
                console.log('coord cartch', error.message);
            }


            const params = [
                req.body.name,
                req.body.age,
                req.body.weight,
                req.body.owner,
                req.file.filename,
                coords,
            ]; // or req.body.filename if filename saved to body
            console.log('create', params);
            const post = await postModel.addPost(params);
            await res.json({ message: 'upload ok' });

            res.json(coords);
        } catch (e) {
            console.log('general error', e);
            res.status(400).json({ message: e.message });
        }
    }
};

const post_update_put = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.send(errors.array());
    } else {
        const params = [
            req.body.name,
            req.body.age,
            req.body.weight,
            req.body.owner,
            req.body.id];
        console.log('update', params);
        const user = await postModel.updatePost(params);
        await res.json(user);
    }
};

const post_delete = async (req, res) => {
    const params = [req.params.id];
    console.log('delete', params);
    const post = await postModel.deletePost(params);
    await res.json(post);
};

module.exports = {
    post_list_get,
    post_get,
    create_post,
    post_update_put,
    post_delete,
};
