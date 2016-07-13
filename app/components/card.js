import React from 'react';
// the Card component exports the data for each card so the other components in the application may access it
export default class Card extends React.Component {
    render() {
        return (
            <div className={`card ${this.props.suit ? this.props.suit : 'face-down'}`}>
                <div className="top-rank">
                    {this.props.rank}
                </div>
                <div className="suit">
                    {this.props.suit}
                </div>
                <div className="bottom-rank">
                    {this.props.rank}
                </div>
            </div>
        );
    }
}