import './css/Waiting.css'
import { useEffect, useState } from "react";

async function getSession() {
    try {
        const response = await fetch("/api/session/getFree", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error("Error:", error);
    }
}

async function createSession() {
    console.log("createSession");
    try {
        const response = await fetch("/api/session/create", {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

function Waiting() {
    /*useEffect(() => { createSession() });*/
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