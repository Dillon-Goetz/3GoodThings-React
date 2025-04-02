import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { account } from '../../appwriteConfig';

const VibeCheck: React.FC<{ onNext: () => void }> = ({ onNext }) => {
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

    return (
        <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", width: "50vw" }}>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>{welcomeMessage}</h2>
                <p>How was your day?</p>
                <div style={{ display: "flex", justifyContent: "space-around", width: "300px", margin: "20px auto" }}>
                    <Link to="/journal/centering-breath?vibe=sad"><span style={{ fontSize: "2em", cursor: "pointer" }}>😔</span></Link>
                    <Link to="/journal/centering-breath?vibe=bad"><span style={{ fontSize: "2em", cursor: "pointer" }}>😕</span></Link>
                    <Link to="/journal/centering-breath?vibe=neutral"><span style={{ fontSize: "2em", cursor: "pointer" }}>😐</span></Link>
                    <Link to="/journal/centering-breath?vibe=happy"><span style={{ fontSize: "2em", cursor: "pointer" }}>🙂</span></Link>
                    <Link to="/journal/centering-breath?vibe=ecstatic"><span style={{ fontSize: "2em", cursor: "pointer" }}>😄</span></Link>
                </div>
            </div>
        </section>
    );
};

export default VibeCheck;
