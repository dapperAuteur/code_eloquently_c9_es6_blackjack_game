import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { fromJS, Map } from 'immutable';

import { newDeck, deal } from './lib/cards';

require('./css/main.scss');

let deck = newDeck();
let playerHand, dealerHand;

[deck, playerHand] = deal(deck, 2);
[deck, dealerHand] = deal(deck, 1);

dealerHand = dealerHand.push(new Map());

const state = fromJS({
    deck,
    playerHand,
    dealerHand,
    "winCount": 0,
    "lossCount": 0,
    hasStood: false
});
// console.log("start deck:");
// console.log(deck);

// let playerHand = deck.takeLast(2);
// deck = deck.skipLast(2);
// let dealerHand = deck.takeLast(2);
// deck = deck.skipLast(2);

// console.log("end deck:");
// console.log(deck);
// console.log("playerHand:");
// console.log(playerHand);
// console.log("dealerHand:");
// console.log(dealerHand);

console.log(state);

ReactDOM.render(
    <App state={state} />,
    document.getElementById('app')
);
