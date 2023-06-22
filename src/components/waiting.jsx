import React from "react";
import './css/Waiting.css'
import { useEffect } from "react";

function Waiting() {
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
        try {
            const response = await fetch("/api/session/create", {
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

    useEffect(() => {
        async function getFreeSession() {
            const session = await getSession();
            if (session != "") {
                window.location.href = "/online";
            }
            else {
                await createSession();
            }
        }
        getFreeSession();
    }, []);

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