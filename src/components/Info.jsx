import './css/Info.css'
import { Link } from 'react-router-dom'
function Info() {
  return (
    <div className="container" id="cont_pagina">
      <title>Info</title>
      <h2>Presentazione del progetto</h2>
      <h3>Il Tris</h3>

      <p>
        Tris è stato un progetto sviluppato sfruttando vari linguaggi di
        programmazione e framework come JavaScript, React, Node JS ed Express.js
      </p>
      <h3>Ci presentiamo: </h3>
      <ul>
        <li> Filippo Novelli, 18 anni, frequentato ITIS P.Paleocapa di Bergamo </li>
        <li> Davide Signorelli, 18 anni, frequentato ITIS P.Paleocapa di Bergamo  </li>
        <li> Sigmund Zois, 18 anni, frequentato ITIS P.Paleocapa di Bergamo  </li>
      </ul>

      <h3>Sono stati utilizzati i seguenti linguaggi e framework, FE (Front-End) o BE (Back-End)</h3><br />

      <ul>
        <li>FE = Javascript: dato che i framework utilizzati sono tutti basati su questo linguaggio</li>
        <li>FE = React: framework utilizzato per creare i componenti che, uniti tra loro, daranno vita all'applicazione nel suo complesso</li>
        <li>BE = Node.js ed Express.js per gestire la parte back-end, ovvero come vengono trattati i dati quando vengono spediti al server </li>
        {/*<li>BE = Express.js </li>*/}
      </ul>
      <h3>Ulteriori informazioni</h3>
      <p>
        Per ulteriori informazioni, scrivi a
        <a id="link" href="mailto:teamsviluppatori18.sorint@gmail.com"> teamsviluppatori18.sorint@gmail.com</a>.
      </p>
      <Link to='/user'>
        <button typeof='button' id='indietro'>Indietro</button>
      </Link>
    </div>
  );
}

export default Info;