import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/login.jsx";
import SignUp from "../components/SignUp.jsx";
import Home from "../components/Home.jsx";
import Game from "../components/Game.jsx";
import Gamex from "../components/Gamex.jsx";
import Info from "../components/Info.jsx";
import User from "../components/User.jsx";

function RequireAuth({ children }) {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    fetch("/api/auth/isLoggedIn", {credentials: "include"})
    .then((res) => setLoggedIn(res.status === 200))
  }, [])

  if (loggedIn === undefined) {
    return <div className="App">Loading...</div>;
  }
  return loggedIn ? children : <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "info",
    element: <Info />,
  },
  {
    path: "game",
    element: (
      <RequireAuth>
        <Game />
      </RequireAuth>
    ),
  },
  {
    path: "gamex",
    element: (
      <RequireAuth>
        <Gamex />
      </RequireAuth>
    ),
  },
  {
    path: "user",
    element: (
      <RequireAuth>
        <User />
      </RequireAuth>
    ),
  },
]);
export default router;
