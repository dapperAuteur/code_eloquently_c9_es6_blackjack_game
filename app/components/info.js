import React from 'react';
import { connect } from 'react-redux';
import { dealToPlayer, stand } from '../../app/action_creators';

// export info function and result to rest of app
export class Info extends React.Component {
    render() {
        let disableButtons = false;
        if(this.props.hasStood || this.props.gameOver) {
            disableButtons = true;
        }
        return (
            <div id="info">
                <span id="player_record">
                    Wins: {this.props.winCount} Losses: {this.props.lossCount} Ties: {this.props.tieCount}
                </span>
                <span id="buttons">
                    <button disabled={disableButtons}
                            onClick={this.props.onClickHit}>
                        Hit
                    </button>
                    <button disabled={disableButtons}
                            onClick={this.props.onClickStand}>
                        Stand
                    </button>
                </span>
            </div>
        );
    }
};

// connect the component with the state being tracked by Redux store, function will take a single parameter: the state object, and return a mapping of the names of this component's props (winCount, lossCount, tieCount, hasStood, gameOver) to variables in state
function mapStateToProps(state) {
    return {
        winCount: state.game.get('winCount'),
        lossCount: state.game.get('lossCount'),
        tieCount: state.game.get('tieCount'),
        hasStood: state.game.get('hasStood'),
        gameOver: state.game.get('gameOver')
    };
}

// connect the component with the action being tracked by Redux store, function will take a single parameter: the state object, and return a mapping of the names of this component's actions to variables in state
const mapDispatchToProps = (dispatch) => {
    return {
        onClickHit: () => {
            dispatch(dealToPlayer());
        },
        onClickStand: () => {
            dispatch(stand());
        }
    };
};

// export component container and actions to app
export const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info);