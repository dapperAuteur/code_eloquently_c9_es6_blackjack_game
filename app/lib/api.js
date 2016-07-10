import fetch from 'isomorphic-fetch';
import url from 'url';

function makeUrl(token) {
    const pathname = `users/${token}`;
    return url.format({
        hostname: "https://code-eloquently-es6-blackjack-dapperauteur.c9users.io",
        port: 8081,
        pathname
    });
}

export function fetchUser(token) {
    return fetch(makeUrl(token), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}