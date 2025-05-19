import React, { useState, useEffect } from "react";
import { account } from "../../../appwriteConfig";
import { useOutletContext, useSearchParams } from "react-router-dom";

interface JournalContext {
    goTo: (i: number, query?: string) => void;
    currentIndex: number;
    lastIndex: number;
}

const VibeCheck = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome!");
    const { goTo, currentIndex } = useOutletContext<JournalContext>();
    const [, setSearchParams] = useSearchParams(); // Optional if you want to pass `vibe` as query param

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const user = await account.get();
                if (user?.name) {
                    setWelcomeMessage(`Welcome, ${user.name}!`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserName();
    }, []);

    const handleVibeSelection = (vibe: string) => {
        // Optional: save to search params or localStorage if needed
        setSearchParams({ vibe });
        goTo(currentIndex + 1, `?vibe=${vibe}`);
    };

    return (
        <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", width: "50vw" }}>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>{welcomeMessage}</h2>
                <p>How was your day?</p>
                <div style={{ display: "flex", justifyContent: "space-around", width: "300px", margin: "20px auto" }}>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={() => handleVibeSelection("sad")}>😔</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={() => handleVibeSelection("bad")}>😕</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={() => handleVibeSelection("neutral")}>😐</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={() => handleVibeSelection("happy")}>🙂</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={() => handleVibeSelection("ecstatic")}>😄</span>
                </div>
            </div>
        </section>
    );
};

export default VibeCheck;
