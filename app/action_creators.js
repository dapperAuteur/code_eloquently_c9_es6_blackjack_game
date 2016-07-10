export function setupGame(seed=new Date().getTime()) {
    return { "type": "SETUP_GAME", seed };
}

export function setRecord(wins, losses, ties) {
    return {
        "type": "SET_RECORD",
        wins,
        losses,
        ties
    };
}

export function dealToPlayer(seed=new Date().getTime()) {
    return { "type": "DEAL_TO_PLAYER", seed };
}

export function stand() {
    return { "type": "STAND" };
}

export function dealToDealer(seed=new Date().getTime()) {
    return { "type": "DEAL_TO_DEALER", seed };
}

export function determineWinner() {
    return { "type": "DETERMINE_WINNER" };
}

export function setSpeed(speed) {
    return { "type": "SET_SPEED", speed };
}

export function fetchRecord () {
    return { "type": "FETCH_RECORD" };
}

export function fetchingRecord() {
    return { "type": "FETCHING_RECORD" };
}

export function fetchedRecord() {
    return { "type": "FETCHED_RECORD" };
}