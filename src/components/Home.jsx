import './css/Home.css'
import { Link } from 'react-router-dom'
function Home() {
    
    return (
        <>
        <nav className="navbar">
          <h1 id="primo">Tris Game 2023</h1>
          <Link to="/login" >
          <button >Accedi</button>
          </Link>
        </nav>
        <footer>
          <h1>Tris game 2023</h1>
          <Link to="/Info" >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4frFGTmlz4hv3xggMg19Wg4q34VEGMc2ulw&usqp=CAU"
            alt="Logo"
          />
          </Link>
          <br />
          Info Ti pippo i soldi!
        </footer>
        
      </>
      
    )
}
export default Home