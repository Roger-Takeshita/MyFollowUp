import tokenService from './tokenService';

const BASE_URL = '/api/users';

function signup(info) {
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(info)
    };
    return fetch(`${BASE_URL}/signup`, options)
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            throw new Error(data.error);
        })
        .then(({ token }) => {
            tokenService.setToken(token);
        });
}

function login(info) {
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(info)
    };
    return fetch(`${BASE_URL}/login`, options)
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            throw new Error(data.error);
        })
        .then(({ token }) => {
            tokenService.setToken(token);
        });
}

function logout() {
    tokenService.removeToken();
}

function updateUser(info) {
    const options = {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: 'Baerer ' + tokenService.getToken()
        }),
        body: JSON.stringify(info)
    };
    return fetch(`${BASE_URL}/${info._id}`, options)
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            throw new Error(data.error);
        })
        .then(({ token }) => {
            tokenService.updateToken(token);
        });
}

function getUser() {
    return tokenService.getUserFromToken();
}

export default {
    signup,
    login,
    logout,
    getUser,
    updateUser
};
