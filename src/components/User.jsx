import { useEffect, useState } from 'react';
import './css/User.css'
import Navbar from './Navbar';
function User() {
    const [played, setPlayed] = useState();
    const [wins, setWins] = useState();
    const [tie, setTie] = useState();
    const [losses, setLosses] = useState();
    const [top5, setTop5] = useState();
    async function ottieniDati() {
        try {
            const response = await fetch("/api/users/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            setLosses(result.losses)
            setWins(result.wins);
            setTie(result.tie);
            setPlayed(result.wins + result.losses + result.tie);
            //console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }

        try {
            const response = await fetch("/api/users/topfive", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            setTop5(result);
            //console.log("Success:", result);
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        ottieniDati()
        //console.log(top5);
    }, []);

    return (
        <>
            <Navbar />

            <div className='div' style={{ marginLeft: '5%' }}>
                <h3 className='header_input_field'>Partite giocate: <input type="text" value={played} disabled className='input_field' /></h3><br />
                <h3 className="header_input_field">Vittorie: <input type="text" disabled value={wins} className='input_field' /></h3> <br />
                <h3 className='header_input_field'>Pareggi:  <input type="text" disabled value={tie} className='input_field' /> </h3><br />
                <h3 className='header_input_field'>Sconfitte:  <input type="text" disabled value={losses} className='input_field' /></h3><br />
            </div>

            <div className='div' style={{ marginLeft: '-10%' }}>
                <p>TOP 5 PLAYER</p>
                <br />
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Vittorie</th>
                    </tr>
                    {top5 != undefined ?
                        top5.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.wins}</td>
                            </tr>
                        )) : <p>Caricameto...</p>}
                </table>
            </div >
        </>

    );
}

export default User;
