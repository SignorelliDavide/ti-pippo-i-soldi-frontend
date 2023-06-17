import { Link } from 'react-router-dom'
import './css/Selection.css'
function Selection() {

    return (
        <body style={{ backgroundColor: 'green' }}>
            <div id="c1">
                <h1 id="c2">Il Mio Gioco</h1>
                <div className="score">
                    Punteggio: <span id="score">0</span>
                </div>
                <Link to="/gamex">
                    <button className="play-button">Gioca</button>
                </Link>
            </div>

        </body>

    )
}
export default Selection




