import React from 'react';
import { InfoContainer } from './info';
import Hand from './hand';
import { connect } from 'react-redux';
import { GameOverMessageContainer } from './game_over_message';
import { Link } from 'react-router';

export class App extends React.Component {
    render() {
        let messageComponent;
        let gameComponents;
        if(this.props.gameOver) {
            messageComponent = <GameOverMessageContainer win={this.props.playerWon} />;
        }
        if(this.props.fetchingRecord) {
            gameComponents = <h1>Loading record...</h1>;
        } else {
            gameComponents = (
                <div class="game">
                    <InfoContainer />
                    { messageComponent }
                    <strong>Player hand:</strong>
                    <Hand cards={this.props.playerHand } />
                    <strong>Dealer hand:</strong>
                    <Hand cards={this.props.dealerHand } />
                </div>
            );
        }
        
        // if(this.props.gameOver) {
        //     messageComponent = <GameOverMessageContainer win={this.props.playerWon} />;
        // }
        
        return (
            <div className="app">
                <div className="links">
                    <Link to="/settings">Settings</Link>
                </div>
                <h1>aweful React Blackjack</h1>
                {gameComponents}
            </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        playerHand: state.game.get('playerHand'),
        dealerHand: state.game.get('dealerHand'),
        gameOver: state.game.get('gameOver'),
        playerWon: state.game.get('playerWon'),
        fetchingRecord: state.api.get('fetchingRecord')
    };
}

export const AppContainer = connect(mapStateToProps)(App);