import React from 'react';
import { connect } from 'react-redux';
import { setupGame } from '../action_creators';

// exports the correct Game Over Message to the app
export class GameOverMessage extends React.Component {
    render() {
        let message;
        
        if(this.props.win === undefined) {
            message = "Tie game.";
        } else if(this.props.win === true) {
            message = "You win!";
        } else {
            message = "You lose :(";
        }
        
        return (
            <div id="game_over_message">
                { message }
                <button onClick={this.props.nextGame}>Next Game</button>
            </div>
        );
    }
}

// connect the component with the state being tracked by Redux store, function will take a single parameter: the state object, and return a mapping of the names of this component's props (setupGame,game_over_message) to variables in state
function mapDispatchToProps(dispatch) {
    return {
        nextGame: () => dispatch(setupGame())
    };
}

// exports state with current game_over_message
export const GameOverMessageContainer = connect(undefined, mapDispatchToProps)(GameOverMessage);