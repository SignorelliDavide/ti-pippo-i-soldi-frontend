import './css/Waiting.css'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

async function joinSession() {
    try {
        const response = await fetch("/api/session/joinSession", {
            method: "GET",
            credentials: "include",
        });
        //console.log("Success:", response);
    }
    catch (error) {
        console.error("Error:", error);
    }
}


function Waiting() {
    const navigate = useNavigate();
    useEffect(() => {
        joinSession();
        sessionVerify();
    });
    async function sessionVerify() {
        try {
            const response = await fetch("/api/session/sessionVerify", {
                method: "GET",
                credentials: "include",
            });
            const result = await response.json();
            //console.log("Success:", result);
            if (result) {
                navigate("/online");
            }
            else {
                sessionVerify();
            }
        }
        catch (error) {
            console.error("Error:", error);
            sessionVerify();
        }
    }
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