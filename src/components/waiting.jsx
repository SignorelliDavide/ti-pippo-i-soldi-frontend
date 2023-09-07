import './css/Waiting.css'
import { useEffect, useState } from "react";

async function joinSession() {
    try {
        const response = await fetch("/api/session/joinSession", {
            method: "GET",
            credentials: "include",
        });
        console.log("Success:", response);
    }
    catch (error) {
        console.error("Error:", error);
    }
}

function Waiting() {
    useEffect(() => {
        joinSession();
    });
    return (
        <div className="center">
            <h1>Waiting for opponent...</h1>
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Waiting;