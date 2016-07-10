import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { score } from '../lib/cards';
import { dealToDealer, determineWinner, setRecord, fetchingRecord, fetchedRecord } from '../action_creators';
import { fetchUser } from '../lib/api';

const getDealerHand = (state) => state.game.get('dealerHand');
const getSpeed = (state) => state.settings.get('speed');

const getUserToken = (state) => state.settings.get('userToken');

// when STAND is called
export function* onStand() {
    const dealSpeed = yield select(getSpeed);
// create dealerHand object
    let dealerHand;
// while the next statement is true, do this
    while(true) {
// run function dealToDealer()
        yield put(dealToDealer());
// set dealerHand to dealerHand after 
        dealerHand = yield select(getDealerHand);
// if dealerScore is equal to or above 17 go to next yield block
        if(score(dealerHand) >= 17) {
            break;
        }
// else delay 2 sec or time given below as second parameter after delay parameter
        else {
            yield call(delay, dealSpeed);
        }
    }
// run determineWinner function
    yield put(determineWinner());
}

export function* onFetchRecord() {
    const userToken = yield select(getUserToken);
    yield put(fetchingRecord());
    const user = yield call(fetchUser, userToken);
    yield put(fetchedRecord());
    yield put(setRecord(user.win_count, user.loss_count, user.tie_count));
}

export default function*() {
    yield [ takeLatest('STAND', onStand),
            takeLatest('FETCH_RECORD', onFetchRecord)
    ];
}