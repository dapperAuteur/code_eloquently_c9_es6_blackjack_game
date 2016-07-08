import 'babel-polyfill';
import { takeLatest } from 'redux-saga';
import { select } from 'redux-saga/effects';
import { score } from '../lib/cards';

const getDealerHand = (state) => state.get('dealerHand');

export function* onStand() {
    let dealerHand = yield select(getDealerHand);
    console.log(score(dealerHand));
    // let i = 0;
    // while(true) {
    //     yield i;
    //     i++;
    // }
}

export default function*() {
    yield takeLatest('STAND', onStand);
}