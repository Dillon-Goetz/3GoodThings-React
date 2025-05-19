import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { account } from "../../../appwriteConfig";

interface VibeCheckProps {
    onNext: (vibe: string) => void;
}

const VibeCheck: React.FC<VibeCheckProps> = ({ onNext }) => {
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome!");

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
        onNext(vibe); // Pass the selected vibe to the parent component
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