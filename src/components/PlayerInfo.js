import React, { Component } from 'react'
import Time from './Time';

export default class PlayerInfo extends Component {
    render() {
        const textLeftStyle = { justifyContent: 'flex-start' };
        const hiddenStyle = { display: 'none' };
        const { playerName } = this.props;

        return (
            <div className="player">
                <p>Player: { playerName }</p>
                <Time styleObj={textLeftStyle}/>
                <div style={hiddenStyle}>
                    <p>step number: {4}</p>
                    <p>time average: {15}s</p>
                </div>
            </div>
        )
    }
}
