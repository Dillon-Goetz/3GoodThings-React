import React, { useState, useEffect } from "react";
import BackButton from '../Shared/NavigationButtons/BackButton';
import NextButton from "../Shared/NavigationButtons/SkipButton";

interface MindfulnessQOTDProps {
    onNext: () => void;
    onBack: () => void;
}

const MindfulnessQOTD: React.FC<MindfulnessQOTDProps> = ({ onNext, onBack }) => {
    const [quote, setQuote] = useState<string | null>(null);
    const [author, setAuthor] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch("Buddha API"); //https://buddha-api.com/api/today
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuote(data.quote);
                setAuthor(data.author);
            } catch (err: any) {
                console.error("Error fetching quote:", err);
                setError("Failed to fetch quote. Please try again later.");
            }
        };

        fetchQuote();
    }, []);

    return (
        <section>
            <h2>Today's Quotation</h2>
            {error && <p className="error">{error}</p>}
            {quote && <p>{quote}</p>}
            {author && <span>- {author}</span>}
            <BackButton onClick={onBack} />
            <NextButton onClick={onNext} text="Next" />
        </section>
    );
};

export default MindfulnessQOTD;
// const MindfulnessQOTD: React.FC<MindfulnessQOTDProps> = ({ onNext, onBack }) => {
//     return (
//         <section>
//             <h2>Today's Quotation</h2>
//             <p>Be true to yourself</p>
//             <span>-Dillon Goetz</span>
//             <BackButton onClick={onBack} />
//             <NextButton onClick={onNext} text="Next" />
//         </section>
//     );
// }

