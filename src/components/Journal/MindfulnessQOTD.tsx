import React from "react";
import BackButton from '../Shared/NavigationButtons/BackButton';
import NextButton from "../Shared/NavigationButtons/SkipButton";

//Add the interface for the props.
interface MindfulnessQOTDProps {
    onNext: () => void;
    onBack: () => void;
}

const MindfulnessQOTD: React.FC<MindfulnessQOTDProps> = ({ onNext, onBack }) => {
    return (
        <section>
            <h2>Today's Quotation</h2>
            <p>Be true to yourself</p>
            <span>-Dillon Goetz</span>
            <BackButton onClick={onBack} />
            <NextButton onClick={onNext} text="Next" />
        </section>
    );
}

export default MindfulnessQOTD;