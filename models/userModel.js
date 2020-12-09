'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM users');
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.log('usermodel error', e.message);
        return {error: 'db error'};
    }
};

const getUser = async (id) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM users WHERE UserId = ?',
            [id]);
        console.log('rows', rows);
        return rows;

    } catch (e) {
        console.log('usermodel error', e.message);
        return {error: 'db error'};
    }
}

const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO users (Name, Email, Password) VALUES (?,?,?)', params);
        console.log('rows', rows);
        return rows;

    }catch (e) {
        console.log('usermodel error', e.message);
        return {error: 'db error'}
    }
}

const getUserLogin = async (params) => {
    try {
        console.log(params);
        const [rows] = await promisePool.execute('SELECT * FROM users WHERE Email = ?;', params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    getUserLogin,
};