const communication = (() => {
    'use strict';
    const urlToServer = '.'; // change url when uploading to server if necessary


    const doFetch = async (url, fetchOptions = {}) => {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw  new Error('request failed');
        }
        return await response.json();
    };


    const getPosts = async () => {
        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            return await doFetch(urlToServer + '/post', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const getUsers = async () => {
        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            return await doFetch(urlToServer + '/user', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const addPost = async (formData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
                body: formData,
            };
            return await doFetch(urlToServer + '/post', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const modifyPost = async (data) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            };
            return await doFetch(urlToServer + '/post', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const deletePost = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        try {
            return await doFetch(urlToServer + '/post/' + id, options);
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const login = async (data) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            return await doFetch(urlToServer + '/auth/login', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const logout = async () => {
        try {
            return await doFetch(urlToServer + '/auth/logout');
        } catch (e) {
            throw new Error(e.message);
        }
    };


    const register = async (data) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            return await doFetch(urlToServer + '/auth/register', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };

    return {
        getPosts,
        modifyPost,
        addPost,
        deletePost,
        getUsers,
        login,
        register,
        logout,
    };
})();