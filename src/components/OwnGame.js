import React, { Component } from 'react';
import calculateWinner from '../utils/calculateWinner';
import OwnBoard from './OwnBoard';
import Time from './Time';
import PlayerInfo from './PlayerInfo';

export default class OwnGame extends Component {
  constructor() {
    super();

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        moveLocation: '',
      }],
      xIsNext: true,
      stepNumber: 0,
      isReverse: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const gameSize = Math.sqrt(history[0].squares.length);
    const moveLocation = [Math.floor(i / gameSize + 1), i % gameSize + 1].join(', ');

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        moveLocation
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(move) {
    this.setState({
      xIsNext: (move % 2) ? false : true,
      stepNumber: move,
    })
  }

  reverseSort(isReverse) {
    this.setState({
      isReverse: !isReverse,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const isReverse = this.state.isReverse;
    let status;

    if (winner) {
      status = `Winner is: ${winner.winnerPlayer}`;
    } else if (this.state.stepNumber === 9) {
      status = "Draw";
    } else {
      status = `Next player is: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move} (${step.moveLocation})` : 'Start game';
      return (
        <li key={move}><a href="/" onClick={() => this.jumpTo(move)}>{desc}</a></li>
      );
    });

    return (
      <div className="app-game">
        <div className="player-game">
          <PlayerInfo playerName="X"/>
          <hr/>
          <PlayerInfo playerName="O"/>
        </div>
        <div className="game">
          <OwnBoard
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner && winner.winnerLocation} />
        </div>
        <div className="game-info">
          <p>{status}</p>
          <ol reversed={isReverse ? 'reverse' : ''}>{isReverse ? moves.reverse() : moves}</ol>
          <button onClick={() => this.reverseSort(isReverse)}>Reverse list</button>
        </div>
      </div>
    );
  }
}