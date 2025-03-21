import React, { useState, useEffect } from "react";
import { FormProps } from "./JournalHome"; // Import the FormProps type
import { account } from "../../appwriteConfig";

const VibeCheck: React.FC<FormProps> = ({ onNext }) => {
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome!");

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const user = await account.get();
                if (user && user.name) {
                    setWelcomeMessage(`Welcome, ${user.name}!`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserName();
    }, []);

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width: "50vw",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2>{welcomeMessage}</h2>
                <p>How was your day?</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "300px",
                        margin: "20px auto",
                    }}
                >
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={onNext}>😔</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={onNext}>😕</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={onNext}>😐</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={onNext}>🙂</span>
                    <span style={{ fontSize: "2em", cursor: "pointer" }} onClick={onNext}>😄</span>
                </div>
            </div>
        </section>
    );
};

export default VibeCheck;
