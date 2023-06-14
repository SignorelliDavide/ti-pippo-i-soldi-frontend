import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./css/login.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function login() {
    event.preventDefault(); // Previeni il comportamento predefinito di submit del modulo
    const dati = {
      password: password,
      email: email
    };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dati)
      });

      const result = await response.json();
      console.log("Success:", result);

      // Utilizza useNavigate per reindirizzare alla home
      navigate("/user");
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("loginErrato").style.visibility = "visible";
    }
  }

  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    fetch("/api/auth/isLoggedIn", { credentials: "include" })
      .then((res) => setLoggedIn(res.status === 200))
  }, [])

  if (loggedIn === true) {
    navigate("/user");
  }




  return (
    <div className="gradient-border" id="box">
      <div className="container">
        <h1>Accesso al portale</h1>
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input onChange={(event) => setEmail(event.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Inserisci la tua email"
              required=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Inserisci la tua password"
              required=""
            />
            <p id='loginErrato' style={{ color: 'red', fontSize: '15px', visibility: 'hidden' }}>*L'Email o la Password sono sbagliati</p>
          </div>
          <div className="button-container">
            <button onClick={login} id="loginButton">Login</button>
            <Link to="/signup">
              <button id="resetPasswordButton">Registrati</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;