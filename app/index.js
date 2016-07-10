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
import { setupGame, fetchRecord } from '../app/action_creators';
import watchActions from './sagas/index';

import queryString from 'query-string';
import randomstring from 'randomstring';

import { newDeck, deal } from './lib/cards';

require('./css/main.scss');

const userToken = queryString.parse(window.location.search).token || randomstring.generate(12);

const initialState = {
    settings: new Map({speed: 750, userToken})
};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, initialState, compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f));

sagaMiddleware.run(watchActions);

const history = syncHistoryWithStore(hashHistory, store);

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
    "tieCount": 0,
    hasStood: false,
    gameOver: false
});

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
