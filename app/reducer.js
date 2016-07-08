import { Map } from 'immutable';

import { newDeck, deal, score } from './lib/cards';


const setupGame = (currentState, seed) => {
    let deck = newDeck(seed);
    let playerHand, dealerHand;
    
    [deck, playerHand] = deal(deck, 2, seed);
    [deck, dealerHand] = deal(deck, 1, seed + 1);
    
    dealerHand = dealerHand.push(new Map());
    
    const hasStood = false;
    
    let gameOver = false;
    let playerWon = undefined;
    let winCount = currentState.get('winCount') || 0;
    let lossCount = currentState.get('lossCount') || 0;

    if(score(playerHand) == 21) {
        gameOver = true;
        playerWon = true;
        winCount += 1;
    }
    
    const newState = new Map({ deck, playerHand, dealerHand, hasStood, gameOver, playerWon, winCount, lossCount
    });
    
    return currentState.merge(newState);
};

const stand = (currentState, seed) => {
    let newState = new Map({"hasStood": true});

    let dealerHand = currentState.get('dealerHand');
    let deck = currentState.get('deck');
    
    dealerHand = dealerHand.filter((element) => element != new Map());

    while(score(dealerHand) < 17) {
        let newCards;
        [deck, newCards] = deal(deck, 1, 1);
        dealerHand = dealerHand.push(newCards.get(0));
    }
    
    let winCount = currentState.get('winCount');
    let lossCount = currentState.get('lossCount');
    let playerHand = currentState.get('playerHand');
    
    const playerScore = score(playerHand);
    const dealerScore = score(dealerHand);
    let playerWon = undefined;
    
    if(playerScore > dealerScore || dealerScore > 21) {
        //newState = new Map({"playerWon": true});
        playerWon = true;
        winCount = (currentState.get('winCount') + 1);
    } else if(dealerScore > playerScore) {
        //newState = new Map({"playerWon": false});
        playerWon = false;
        lossCount = (currentState.get('lossCount') + 1);
    }
    
    const gameOver = true;
    
    newState = newState.merge({
        dealerHand, deck, winCount, lossCount, gameOver, playerWon
    });

    //newState = newState.merge({dealerHand, deck, playerWon});
    //console.log(newState);

    return currentState.merge(newState);
};

const setRecord = (currentState, wins, losses) => {
    return currentState.merge(new Map({ "winCount": wins, "lossCount": losses }));
};

export default function(currentState=new Map(), action) {
    switch(action.type) {
        case 'SETUP_GAME':
            return setupGame(currentState, action.seed);
        case 'SET_RECORD':
            return setRecord(currentState, action.wins, action.losses);
        case 'DEAL_TO_PLAYER':
            return dealToPlayer(currentState, action.seed);
        case 'STAND':
            return stand(currentState, action.seed);
    }
    return currentState;
    
}

const dealToPlayer = (currentState, seed) => {
    const [deck, newCard] = deal(currentState.get('deck'), 1, seed);
    
    const playerHand = currentState.get('playerHand').push(newCard.get(0));
    
    let newState = new Map({ deck, playerHand });
    let playerScore;
    let dealerScore;
    
    const newScore = score(playerHand);
    
    if(newScore > 21) {
        const lossCount = currentState.get('lossCount') + 1;
        const gameOver = true;
        const playerWon = false;
        newState = newState.merge({lossCount, gameOver, playerWon});
    }
    
    if(newScore == 21) {
        const winCount = currentState.get('winCount') + 1;
        const gameOver = true;
        const playerWon = true;
        newState = newState.merge({winCount, gameOver, playerWon});
    }
    
    // if(newScore > dealerScore) {
    //     const winCount = currentState.get('winCount') + 1;
    //     const gameOver = true;
    //     const playerWon = true;
    //     newState = newState.merge({winCount, gameOver, playerWon});
    // }
    
    // if(dealerScore > 21) {
    //     const winCount = currentState.get('winCount') + 1;
    //     const gameOver = true;
    //     const playerWon = true;
    //     newState = newState.merge({winCount, gameOver, playerWon});
    // }
    
    return currentState.merge(newState);
};