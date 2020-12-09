'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM posts');
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getPost = async (id) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM posts WHERE PostId = ?', [id]);
        console.log('rows', rows);
        return rows;

    } catch (e) {
        console.log('postmodel error', e.message);
        throw new Error(e.message);
    }
};

const addPost = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO posts (Description, CreationDate, Filename) VALUES (?,?,?)', params);
        console.log('rows', rows);
        return rows;

    }catch (e) {
        console.log('postmodel error', e.message);
        throw new Error(e.message);
    }
};

const updatePost = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE posts SET Description = ?, WHERE PostId = ?', params);
        console.log('rows', rows);
        return rows;

    }catch (e) {
        console.log('postmodel error', e.message);
        throw new Error(e.message);
    }
};

const deletePost = async (id) => {
    try {
        const [rows] = await promisePool.execute('DELETE FROM posts WHERE PostId = ?',
            [id]);
        console.log('rows', rows);
        return rows;

    }catch (e) {
        console.log('postmodel error', e.message);
        throw new Error(e.message);
    }
};


module.exports = {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
};