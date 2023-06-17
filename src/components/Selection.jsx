import { Link } from 'react-router-dom'
import './css/Selection.css'
function Selection() {

    return (
        <div id="c1">
            <h1 id="c2">The Tris Game</h1>
            <Link to="/gamex">
                <button className="play-button">ONline</button>
            </Link>
            <Link to="/gamex">
                <button className="play-button">OFFline</button>
            </Link>
        </div>
    )
}
export default Selection




