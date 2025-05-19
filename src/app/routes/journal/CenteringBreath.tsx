import React, { useEffect, useState } from "react";
import { useLocation, } from "react-router-dom";
import BackButton from "../../../components/Shared/NavigationButtons/BackButton";
import NextButton from "../../../components/Shared/NavigationButtons/SkipButton";


// Back and Next button required for this component 
interface CenteringBreathProps {
  onNext: () => void;
  onBack: () => void;
}

const CenteringBreath: React.FC<CenteringBreathProps> = ({ onNext, onBack }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vibe = searchParams.get("vibe");
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
          {/* Add your breathing exercise content here */}
          <p>Inhale deeply through your nose...</p>
          <p>Exhale slowly through your mouth...</p>
          <p>Repeat 2 more times.</p>
          <BackButton onClick={onBack} />
          <NextButton onClick={onNext} text="I'm Ready" />
      </div>
  );
};

export default CenteringBreath;