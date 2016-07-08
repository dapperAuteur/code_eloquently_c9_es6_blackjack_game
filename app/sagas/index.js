import 'babel-polyfill';
import { takeLatest } from 'redux-saga';

export function* onStand() {
    console.log("stand action");
    // let i = 0;
    // while(true) {
    //     yield i;
    //     i++;
    // }
}

export default function*() {
    yield takeLatest('STAND', onStand);
}