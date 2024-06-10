import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    /*
    const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];
    atau bisa disingkat menjadi kode seperti dibawah dengan destructuring*/
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

function Board({ xNextTurn, squares, onPlay }) {
  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquare = squares.slice();
    /*
    if (xNextTurn) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
      jika ingin membuat dengan ternary operator maka code nya akan seperti dibawah
    */
    nextSquare[i] = xNextTurn ? "X" : "O";

    onPlay(nextSquare);
  }

  const winner = calculateWinner(squares);
  let status = " ";
  /*
  if (winner) {
    status = "pemenang nya adalah " + winner;
  } else if (xNextTurn) {
    status = "sekarang giliran X";
  } else {
    status = "sekarang giliran O";
  }
  jika ingin membuat dengan ternary operator maka code nya akan seperti dibawah
  */
  if (winner) {
    status = "pemenang nya adalah " + winner;
  } else {
    status = "sekarang giliran " + (xNextTurn ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [xNextTurn, setXNextTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXNextTurn(nextMove % 2 === 0);
  }

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXNextTurn(!xNextTurn);
  }

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = "back to move #" + move;
    } else {
      description = "back to start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="title">tic tac toe game</div>
      <div className="game">
        <div className="game-board">
          <Board
            xNextTurn={xNextTurn}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
