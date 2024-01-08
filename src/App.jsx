import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  'X': 'Player 1',
  'Y': 'Player 2',
}

const INITIAL_GAME_PLAYER = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }    
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_PLAYER.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }   
  
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns); 
  const gameBoard = deriveGameBoard(gameTurns);
  
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerName(symbol, name) {    
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name
      };
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {  

      let currentPlayer = deriveActivePlayer(prevTurns); 

      const updatedTurns = [
        { 
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer 
        }, 
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRemarch() {
    setGameTurns([]);
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive = {activePlayer === 'X'}
            onChangeName={handlePlayerName}
          />
          <Player 
            initialName={PLAYERS.Y} 
            symbol="O" 
            isActive = {activePlayer === 'O'}          
            onChangeName={handlePlayerName}
          />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRemarch}/>}
      <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board={gameBoard}/>   
    </div>    
    <Log turns={gameTurns}/> 
  </main>;
}

export default App
