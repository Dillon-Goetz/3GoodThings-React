import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import BackButton from "../../../components/Shared/NavigationButtons/BackButton";
import NextButton from "../../../components/Shared/NavigationButtons/SkipButton";
import JournalStepLayout from "@/components/Layouts/JournalStepLayout";

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
    <JournalStepLayout
      title="Centering Breath"
      description="Let's take a moment to breathe and center ourselves."
      // 4. Pass the navigation buttons to the footer
      footerContent={
        <div className="flex items-center justify-between w-full max-w-xs mx-auto">
            <BackButton onClick={() => goTo(currentIndex - 1)} />
            <NextButton onClick={() => goTo(currentIndex + 1)} text="I'm Ready" />
        </div>
      }
    >
        {/* 3. The main content goes inside the layout as children */}
        <div className="text-lg space-y-2">
            <p>Inhale deeply through your nose...</p>
            <p>Exhale slowly through your mouth...</p>
            <p>Repeat 2 more times.</p>
        </div>
    </JournalStepLayout>
  );
};

export default CenteringBreath;
