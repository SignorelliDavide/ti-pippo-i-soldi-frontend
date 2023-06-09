import { useState } from "react";
import './css/SignUp.css'
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  async function registra() {
    event.preventDefault(); // Previeni il comportamento predefinito di submit del modulo
    const dati = {
      name: username,
      password: password,
      email: email
    };
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dati)
      });

      const result = await response.json();
      console.log("Success:", result);
      if (result == "Email is already used")
        document.getElementById("emailErrata").style.visibility = "visible";
      else
        navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <div className="gradient-border" id="box">
      <div className='container' id="">
        <h1>Registrati!</h1>
        <form onSubmit={registra}>
          <div className="form-group" id="">
            <span className="" id="">
              Nome
            </span>
            <input onChange={(event) => setUsername(event.target.value)}
              type="text"
              className="form-control"
              placeholder="Nome"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="form-group" id="email">
            <span className="input" id="">
              E-mail
            </span>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <p style={{ fontSize: '15px', marginTop: '-1px' }} id="">
              @example.com
            </p>
            <p id='emailErrata' style={{ color: 'red', fontSize: '15px', visibility: 'hidden' }}>*L'Email è già in uso</p>
          </div>
          <div className="form-group" id="">
            <p style={{ marginTop: '-20px', marginBottom: '0px' }} id="">
              Password
            </p>
            <input onChange={(event) => setPassword(event.target.value)} type="password" />
            <br />
            <button onClick={registra} value="Submit">
              Registrati
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignUp;