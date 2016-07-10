import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { score } from '../lib/cards';
import { dealToDealer, determineWinner, setRecord, fetchingRecord, fetchedRecord, patchingRecord, patchedRecord } from '../action_creators';
import { fetchUser, patchUser } from '../lib/api';

// get win/loss count from state to share with Rails api
const getWinCount = (state) => state.game.get('winCount');
const getLossCount = (state) => state.game.get('lossCount');
// const getTieCount = (state) => state.game.get('tieCount');

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

// body of the request to the rails server
export function* onPatchRecord() {
    const userToken = yield select(getUserToken);
    const winCount = yield select(getWinCount);
    const lossCount = yield select(getLossCount);
    // const tieCount = yield select(getTieCount);
    yield put(patchingRecord());
    yield call(patchUser, userToken, {
        user: {
            'win_count': winCount,
            'loss_count': lossCount//,
            //'tie_count': tieCount
        }
    });
    yield put(patchedRecord());
}

export default function*() {
    yield [ takeLatest('STAND', onStand),
            takeLatest('FETCH_RECORD', onFetchRecord),
            takeLatest('SETUP_RECORD', onPatchRecord)
    ];
}