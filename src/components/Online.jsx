import { useState } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { Link } from "react-router-dom";
import './css/Gamex.css';

const initialState = { stato: "hidden" };
const { useGlobalState } = createGlobalState(initialState);

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square cells"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

async function invioRisultato(risultato) {
  try {
    const response = await fetch("/api/users/result", {
      method: "POST",
      body: JSON.stringify(risultato),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

function Board({ xIsNext, squares, onPlay }) {
  const [status, setStatus] = useState("Prossimo giocatore: " + (xIsNext ? "X" : "O"));
  const [stato, setState] = useGlobalState("stato");
  const [moves, setMoves] = useState(0);

  function handleClick(i) {
    if (squares[i]) {
      return;
    }

    setMoves(moves + 1);

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

    if (calculateWinner(nextSquares) || moves == 8) {
      const winner = calculateWinner(nextSquares);
      if (winner) {
        setState("visible");
        setStatus("Vincitore: " + winner);
        if (winner == "O") {
          invioRisultato({ result: "lose" });
        } else {
          invioRisultato({ result: "win" });
        }
      } else if (moves == 8) {
        setState("visible");
        invioRisultato({ result: "tie" });
        setStatus("Pareggio");
      }
      setMoves(0);

      return;
    }

    setStatus("Prossimo giocatore: " + (xIsNext ? "O" : "X"));

  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Online() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stato, setState] = useGlobalState("stato");
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Ritorna alla mossa #" + move;
    } else {
      description = "Inizio";
    }
    return (
      <>
        <button
          style={{ visibility: stato, margin: "20px" }}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </>
    );
  });

  return (
    <>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div style={{ textAlign: "center", width: "auto" }}>
        <Link onClick={() => { setState("hidden"); }} to="/user">
          <button>Indietro</button>
        </Link>
        <br />
        {moves}
      </div>
    </>
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
