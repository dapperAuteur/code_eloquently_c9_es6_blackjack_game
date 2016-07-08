import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { AppContainer } from './components/app.js';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS, Map } from 'immutable';
import { Settings } from './components/settings.js';

import reducer from './reducers/index';
import { setupGame, setRecord } from '../app/action_creators';
import watchActions from './sagas/index';

import { newDeck, deal } from './lib/cards';

require('./css/main.scss');

const initialState = { settings: new Map({speed: 750}) };

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, initialState, compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f));

sagaMiddleware.run(watchActions);

const history = syncHistoryWithStore(hashHistory, store);

// let store = createStore(reducer, undefined, window.devToolsExtension ? window.devToolsExtension() : undefined);

// store.dispatch(setRecord(0, 0));
store.dispatch(setupGame());

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
    hasStood: false,
    gameOver: false
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
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppContainer} />
            <Route path="/settings" component={Settings} />
        </Router>
    </Provider>,
    document.getElementById('app')
);
