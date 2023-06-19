import React from "react";
import './css/Waiting.css'
function Waiting() {
    return (
        <div className="center">
            <h1>Waiting for opponent...</h1>
            <div class="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
export default Waiting;