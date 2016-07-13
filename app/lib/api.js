import fetch from 'isomorphic-fetch';
import url from 'url';

function makeUrl(token) {
    const pathname = `users/${token}`;
    return url.format({
        hostname: "react-blackjack.firebaseapp.com",
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

// function in api utility file that sends a PATCH request to Rails server, similar to GET request to fetch record, only difference is this one needs to send some data, (new/loss,tie counters) to server using body with request
export function patchUser(token, body) {
    return fetch(makeUrl(token), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}