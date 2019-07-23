import React, { Component } from "react";
import OwnBoard from "./OwnBoard";
import Time from "./Time";

import calculateWinner from "../utils/calculateWinner";
import calculateTimer from "../utils/calculateTimer";
import * as constants from "../constants/index";

export default class OwnGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(props.gameSize * props.gameSize).fill(null),
          moveLocation: ""
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      isReverse: false,
      statusGame: constants.GAME_INIT,
      gameSize: props.gameSize,
      timeGame: 0,
      timeX: 0,
      timeY: 0
    };

    this.onStart = this.onStart.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onResume = this.onResume.bind(this);
    this.onUndo = this.onUndo.bind(this);
  }

  onStart(e) {
    e.preventDefault();
    if (this.state.statusGame === constants.GAME_INIT) {
      const { gameSize } = this.props;
      this.setState({
        statusGame: constants.GAME_START,
        timeGame: 0,
        timeX: 0,
        timeY: 0,
        xIsNext: true,
        stepNumber: 0,
        history: [
          {
            squares: Array(gameSize * gameSize).fill(null),
            moveLocation: ""
          }
        ]
      });
      this.setTimerGame();
    }
    console.log("Start");
  }

  onReset(e) {
    e.preventDefault();
    if (this.state.statusGame === constants.GAME_END) {
      this.setState({
        statusGame: constants.GAME_INIT
      });
    }
    this.setState({
      timeGame: 0,
      xIsNext: true,
      stepNumber: 0,
      history: [
        {
          squares: Array(9).fill(null),
          moveLocation: ""
        }
      ]
    });
    console.log("Reset");
  }

  onPause(e) {
    e.preventDefault();
    if (this.state.statusGame === constants.GAME_START) {
      this.setState({ statusGame: constants.GAME_PAUSE });
      clearInterval(this.timer);
    }
    console.log("Pause");
  }

  onResume(e) {
    e.preventDefault();
    this.startTimerAndGame();
    console.log("Resume");
  }

  onUndo(e) {
    e.preventDefault();
    const { statusGame, history, stepNumber } = this.state;
    if (
      statusGame !== constants.GAME_END &&
      statusGame !== constants.GAME_INIT &&
      history.length > 1
    ) {
      history.pop();
      this.setState({
        history: history,
        stepNumber: stepNumber - 1
      });
    }

    console.log("Undo");
  }

  startTimerAndGame() {
    this.setState({
      statusGame: constants.GAME_START
    });
    this.setTimerGame();
  }

  stopTimerAndUpdateGame() {
    this.setState({ statusGame: constants.GAME_END });
    clearInterval(this.timer);
  }

  setTimerGame() {
    this.timer = setInterval(() => {
      this.setState({
        timeGame: this.state.timeGame + 1
      });

      if (this.state.xIsNext) {
        this.setState({
          timeX: this.state.timeX + 1
        });
      } else {
        this.setState({
          timeY: this.state.timeY + 1
        });
      }
    }, 1000);
  }

  handleClick(i) {
    const { statusGame } = this.state;
    if (statusGame === constants.GAME_START) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const gameSize = this.state.gameSize;

      // check click squares
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      const moveLocation = [
        Math.floor(i / gameSize + 1),
        (i % gameSize) + 1
      ].join(", ");

      this.setState(
        {
          history: history.concat([
            {
              squares,
              moveLocation
            }
          ]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length
        },
        () => {
          if (this.state.stepNumber === Math.pow(gameSize, 2)) {
            this.stopTimerAndUpdateGame();
          }
        }
      );

      // check win after click
      if (calculateWinner(squares)) {
        this.stopTimerAndUpdateGame();
      }
    }
  }

  jumpTo(e, move) {
    e.preventDefault();
    this.setState({
      xIsNext: move % 2 ? false : true,
      stepNumber: move
    });
  }

  reverseSort(isReverse) {
    this.setState({
      isReverse: !isReverse
    });
  }

  render() {
    const { history, timeGame } = this.state;
    const current = history[this.state.stepNumber];
    const isReverse = this.state.isReverse;
    const winner = calculateWinner(current.squares);
    const { min, sec } = calculateTimer(timeGame);
    let status;

    if (winner) {
      status = `Winner is: ${winner.winnerPlayer}`;
    } else if (this.state.stepNumber === 9) {
      status = "Draw";
    } else {
      status = `Next player is: ${this.state.xIsNext ? "X" : "O"}`;
    }

    const moves = history.map((step, move) => {
      // const desc = move ? `Move #${move} (${step.moveLocation})` : "Start game";
      return (
        <li key={move}>
          <a href="/" onClick={e => this.jumpTo(e, move)}>
            {`Move #${move} (${step.moveLocation})`}
          </a>
        </li>
      );
    });

    return (
      <div className="app-game">
        <div className="game-option">
          <p>Game Option:</p>
          <ul>
            <li>
              <a href="/" onClick={this.onStart}>
                Start game
              </a>
            </li>
            <li>
              <a href="/" onClick={this.onReset}>
                Reset game
              </a>
            </li>
            {this.state.statusGame !== constants.GAME_PAUSE ? (
              <li>
                <a href="/" onClick={this.onPause}>
                  Pause game
                </a>
              </li>
            ) : (
              <li>
                <a href="/" onClick={this.onResume}>
                  Resume game
                </a>
              </li>
            )}
            <li>
              <a href="/" onClick={this.onUndo}>
                Undo
              </a>
            </li>
          </ul>
        </div>
        <div className="game">
          <OwnBoard
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner && winner.winnerLocation}
          />
        </div>
        <div className="game-info">
          <Time min={min} sec={sec} />
          <p>{status}</p>
          <ol reversed={isReverse ? "reverse" : ""} className="step-game">
            {isReverse ? moves.reverse() : moves}
          </ol>
          <button onClick={() => this.reverseSort(isReverse)}>
            Reverse list
          </button>
        </div>
      </div>
    );
  }
}
