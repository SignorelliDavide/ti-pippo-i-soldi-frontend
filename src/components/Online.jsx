import { useState, useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { Link } from "react-router-dom";
import './css/Gamex.css';

const initialState = { stato: "hidden" };
const { useGlobalState } = createGlobalState(initialState);

async function getxIsNext() {
  const response = await fetch("/api/session/getxIsNext", {
    method: "GET",
    credentials: "include",
  })
  const result = await response.json();
  return result;
}

async function setxIsNext() {
  const response = await fetch("/api/session/setxIsNext", {
    method: "POST",
    credentials: "include",
  })
}

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
    //console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}



function Board({ squares, onPlay }) {
  const [status, setStatus] = useState("Prossimo giocatore: " + (getxIsNext ? "X" : "O"));
  const [stato, setState] = useGlobalState("stato");
  const [moves, setMoves] = useState(0);
  const [player, setPlayer] = useState("");
  const [inter, setInter] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/session/whoIsPlaying", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPlayer(data);
        setInter(setInterval(() => {
          update(data);
        }, 2000));
      } else {
        console.error("Errore nella richiesta HTTP");
      }
    } catch (error) {
      console.error("Errore nella richiesta HTTP:", error);
    }
  };

  async function update(player) {
    if (!isGameFinished && !calculateWinner(squares))
      try {
        const response = await fetch("/api/session/update", {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        const xTurn = result[0].xIsNext;
        //console.log("Success:", result);
        for (let i = 0; i < 9; i++) {
          const key = `cell${i}`;
          const value = result[0][key];
          //console.log(squares[i]);
          if (value != squares[i]) {
            squares[i] = value;
            setMoves(moves + 1);
            onPlay(squares);
            if (calculateWinner(squares) || moves == 8) {
              const winner = calculateWinner(squares);
              if (winner) {
                setStatus("Vincitore: " + winner);
                if (winner == player) {
                  invioRisultato({ result: "win" });
                } else {
                  invioRisultato({ result: "lose" });
                }
              } else if (moves == 8) {
                invioRisultato({ result: "tie" });
                setStatus("Pareggio");
              }
              setMoves(0);
              setIsGameFinished(true);
              clearInterval(inter);
              console.log("Game finished");
              await fetch("/api/session/delete", {
                method: "DELETE",
                credentials: "include",
              });
              await fetch("/api/session/delete", {
                method: "DELETE",
                credentials: "include",
              });
              return;
            }
            setStatus("Prossimo giocatore: " + (xTurn ? "X" : "O"));
          }
        }



      } catch (error) {
        console.error("Error:", error);
      }
  };


  useEffect(() => {
    fetchData();
  }, []);

  async function handleClick(i) {
    const response = await fetch("/api/session/getxIsNext", {
      method: "GET",
      credentials: "include",
    })
    const xTurn = await response.json();
    if (squares[i]) {
      return;
    }
    if (player == "X" && xTurn == false || player == "O" && xTurn == true)
      return;

    setMoves(moves + 1);

    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);



    setStatus("Prossimo giocatore: " + (!xTurn ? "X" : "O"));
    setxIsNext();


    fetch("/api/session/insert", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cell: i }),
    });

    if (calculateWinner(squares) || moves == 8) {
      const winner = calculateWinner(squares);
      if (winner) {
        setStatus("Vincitore: " + winner);

      } else if (moves == 8) {
        invioRisultato({ result: "tie" });
        setStatus("Pareggio");
      }
      setMoves(0);
      setIsGameFinished(true);
      clearInterval(inter);
      return;
    }

  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tu sei: {player}</h1>
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
      <Board squares={currentSquares} onPlay={handlePlay} />
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
