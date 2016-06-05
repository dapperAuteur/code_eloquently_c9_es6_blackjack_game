import React from 'react';
import { connect } from 'react-redux';

export class Info extends React.Component {
    render() {
        return (
            <div id="info_bar">
                <span id="player_record">
                    Wins: {this.props.winCount} Losses: {this.props.lossCount}
                </span>
                <span id="buttons">
                    <button disabled={this.props.hasStood}>Hit</button>
                    <button disabled={this.props.hasStood}>Stand</button>
                </span>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        winCount: state.get('winCount'),
        lossCount: state.get('lossCount'),
        hasStood: state.get('hasStood')
    };
}

export const InfoContainer = connect(mapStateToProps)(Info);