  
import React, { Component } from 'react'
import Board from './Board';
import axios from 'axios';

export default class Game extends Component {
            state = {
            xIsNext: true,
            stepNumber: 0,
            message: ["Start game"],
            history: [
                { squares: Array(9).fill(null) },
            ]
        };

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
        this.logData(i)    
    }

    logData(i) {
        let message ;
        if (i===0){
            message = "Player chose Row 1 Column 1";
        }else if (i===1){
            message = "Player chose Row 1 Column 2";
        }else if (i===2){
            message = "Player chose Row 1 Column 3";
        }else if (i===3){
            message = "Player chose Row 2 Column 1";
        }else if (i===4){
            message = "Player chose Row 2 Column 2";
        }else if (i===5){
            message = "Player chose Row 2 Column 3";
        }else if (i===6){
            message = "Player chose Row 3 Column 1";
        }else if (i===7){
            message = "Player chose Row 3 Column 2";
        }else if (i===8){
            message = "Player chose Row 3 Column 3";
        };
        axios
          .post("http://localhost:8081/add-to-log", {message})
          .then((response) => {
            this.setState({
                message:response.data
            })
          })
          .catch((error) => {
            console.log(error);
          });
        }

    refreshGame(){ 
        this.setState({
            history: [
                {squares: Array(9).fill(null)}
            ],
            xIsNext: true,
            stepNumber: 0
            });
        }

    render() {
        const messageList = this.state.message.map((item, index)=>
        <li key = {index}> {item}</li>);
        // console.log(messageList);
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (    
            <div className="game">
                <div>
                    <div className="game-board">
                        <Board onClick={(i) => this.handleClick(i)}
                        squares={current.squares} />
                    </div>
                    <button onClick={this.refreshGame.bind(this)} >Start New Game</button>
                </div>
                <div>
                    <div className="game-turn">
                        <div>{status}</div>
                    </div>
                <div className="game-information">
                    <ul>{messageList}</ul>
                </div>
                </div>
            </div>      
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}