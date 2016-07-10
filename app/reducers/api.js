// import immutable Map to props in current state
import { Map } from 'immutable';

// export currentState so that the rest of the app may access the states changed by this function.
export default function(currentState = new Map(), action) {
    // switch case statement for two functions that change the state of fetching record, this state determines when game loads, it should load after fetching userRecord
    switch(action.type) {
        case 'FETCHING_RECORD':
            return currentState.set('fetchingRecord', true);
        case 'FETCHED_RECORD':
            return currentState.set('fetchingRecord', false);
    }
    
    return currentState;
}