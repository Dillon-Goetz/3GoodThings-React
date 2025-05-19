import React from "react";
import { useOutletContext } from "react-router-dom";
import BackButton from "../../../components/Shared/NavigationButtons/BackButton";
import NextButton from "../../../components/Shared/NavigationButtons/SkipButton"

interface OutletContext {
  goTo: (index: number, query?: string) => void;
  currentIndex: number;
  lastIndex: number;
}

const MindfulnessQOTD = () => {
  const { goTo, currentIndex } = useOutletContext<OutletContext>();

  // Replace with dynamic quote later when CORS issue is resolved
  const quote = "Be true to yourself";
  const author = "Dillon Goetz";

  return (
    <section>
      <h2>Today's Quotation</h2>
      <p>{quote}</p>
      <span>- {author}</span>
      <BackButton onClick={() => goTo(currentIndex - 1)} />
      <NextButton onClick={() => goTo(currentIndex + 1)} text="Next" />
    </section>
  );
};

export default MindfulnessQOTD;
