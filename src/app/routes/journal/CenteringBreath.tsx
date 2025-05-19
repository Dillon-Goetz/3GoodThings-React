import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import BackButton from "../../../components/Shared/NavigationButtons/BackButton";
import NextButton from "../../../components/Shared/NavigationButtons/SkipButton";

interface OutletContext {
  goTo: (index: number, query?: string) => void;
  currentIndex: number;
  lastIndex: number;
}

const CenteringBreath = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vibe = searchParams.get("vibe");

  const { goTo, currentIndex } = useOutletContext<OutletContext>();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    switch (vibe) {
      case "sad":
        setMessage("It's okay to feel sad. Let's take some deep breaths to calm your mind.");
        break;
      case "bad":
        setMessage("They can't all be good days. Breathing exercises can help you find your balance.");
        break;
      case "neutral":
        setMessage("Sometimes you can just feel fine. Let's use this moment to connect with ourselves with the breath.");
        break;
      case "happy":
        setMessage("Good vibes! Let's share that joy with the body using intentional breaths.");
        break;
      case "ecstatic":
        setMessage("Great day! Let's maintain that positivity with mindful breathing.");
        break;
      default:
        setMessage("Let's take a moment to breathe and center ourselves.");
    }
  }, [vibe]);

  return (
    <div>
      <h2>Centering Breath</h2>
      <p>{message}</p>
      <p>Inhale deeply through your nose...</p>
      <p>Exhale slowly through your mouth...</p>
      <p>Repeat 2 more times.</p>
      <BackButton onClick={() => goTo(currentIndex - 1)} />
      <NextButton onClick={() => goTo(currentIndex + 1)} text="I'm Ready" />
    </div>
  );
};

export default CenteringBreath;
