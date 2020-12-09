'use strict';
const url = '.'; // change url when uploading to server

// select existing html elements
const loginWrapper = document.querySelector('#login-wrapper');
const userInfo = document.querySelector('#user-info');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const addUserForm = document.querySelector('#add-user-form');
const addForm = document.querySelector('#add-post-form');
const modForm = document.querySelector('#mod-post-form');
const ul = document.querySelector('ul');
const userLists = document.querySelectorAll('.add-owner');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

// create cat cards
const createPostCards = (posts) => {
    // clear ul
    ul.innerHTML = '';
    posts.forEach((post) => {
        // create li with DOM methods
        const img = document.createElement('img');
        img.src = url + '/thumbnails/' + post.filename;
        img.alt = post.name;
        img.classList.add('resp');

        // open large image when clicking image
        img.addEventListener('click', () => {
            modalImage.src = url + '/' + post.filename;
            imageModal.alt = post.name;
            imageModal.classList.toggle('hide');
            try {
                const coords = post.coords.split(',');
                // console.log(coords);
                addMarker(coords);
            } catch (e) {
            }
        });

        const figure = document.createElement('figure').appendChild(img);

        const h2 = document.createElement('h2');
        h2.innerHTML = post.name;


        // add selected cat's values to modify form
        const modButton = document.createElement('button');
        modButton.innerHTML = 'Modify';
        modButton.addEventListener('click', () => {
            const inputs = modForm.querySelectorAll('input');
            inputs[0].value = post.name;

            inputs[3].value = post.PostId;
            modForm.querySelector('select').value = cat.owner;
        });

        // delete selected cat
        const delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.addEventListener('click', async () => {
            try {
                const json = await communication.deletePost(posts.PostId);
                console.log('delete response', json);
                getPost(); // update cat list
            } catch (e) {
                console.log(e.message());
            }
        });

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(modButton);
        li.appendChild(delButton);
        ul.appendChild(li);
    });
};

// close modal
close.addEventListener('click', (evt) => {
    evt.preventDefault();
    imageModal.classList.toggle('hide');
});

// get all cats
const getPost = async () => {
    console.log('getPost token ', sessionStorage.getItem('token'));
    try {
        const posts = await communication.getPosts();
        createPostCards(posts);
    } catch (e) {
        alert(e.message);
    }
};

// create user options to <select>
const createUserOptions = async () => {
    const users = await communication.getUsers();
    userLists.forEach((list) => {
        // clear user list
        list.innerHTML = '';
        users.forEach((user) => {
            // create options with DOM methods
            const option = document.createElement('option');
            option.value = users.userId;
            option.innerHTML = user.name;
            option.classList.add('light-border');
            list.appendChild(option);
        });
    });
};

// submit add cat form
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    try {
        const json = await communication.addPost(fd);
        console.log('add response', json);
        if (json) {
            console.log('here');
            getPost(); // refresh cat list after upload
        }
    } catch (e) {
        alert(e.message);
    }
});

// submit modify form
modForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(modForm);
    try {
        const json = await communication.modifyPost(data);
        if (json) {
            console.log('here');
            getPost();
        }
    } catch (e) {
        alert(e.message);
    }
});

// login
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm);
    try {
        const json = await communication.login(data);
        if (!json.user) {
            alert(json.message);
        } else {
            // save token
            sessionStorage.setItem('token', json.token);
            // show/hide forms + cats
            loginWrapper.style.display = 'none';
            logOut.style.display = 'block';
            main.style.display = 'block';
            userInfo.innerHTML = `Hello ${json.user.name}`;
            getPost();
            createUserOptions();
        }
    } catch (e) {
        alert(e.message);
    }
});

// logout
logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const json = await communication.logout();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        alert('You have logged out');
        // show/hide forms + cats
        loginWrapper.style.display = 'flex';
        logOut.style.display = 'none';
        main.style.display = 'none';
    } catch (e) {
        alert(e.message);
    }
});

// submit register form
addUserForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(addUserForm);
    try {
        const json = await communication.register(data);
        // save token
        sessionStorage.setItem('token', json.token);
        // show/hide forms + cats
        loginWrapper.style.display = 'none';
        logOut.style.display = 'block';
        main.style.display = 'block';
        userInfo.innerHTML = `Hello ${json.user.name}`;
        getPost();
        createUserOptions();
    } catch (e) {
        alert(e.message);
    }
});

// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
if (sessionStorage.getItem('token')) {
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
    main.style.display = 'block';
    getPost();
    createUserOptions();
}