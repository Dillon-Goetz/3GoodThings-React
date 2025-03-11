import React from "react";

const VibeCheck: React.FC = () => {
  return (
    <div>
      <h2>How was your day? (1-5 emoji scale)</h2>
      <div style={{ display: "flex", justifyContent: "space-around", width: "300px", margin: "20px auto" }}>
        <span style={{ fontSize: "2em", cursor: "pointer" }}>😔</span>
        <span style={{ fontSize: "2em", cursor: "pointer" }}>😕</span>
        <span style={{ fontSize: "2em", cursor: "pointer" }}>😐</span>
        <span style={{ fontSize: "2em", cursor: "pointer" }}>🙂</span>
        <span style={{ fontSize: "2em", cursor: "pointer" }}>😄</span>
      </div>
    </div>
  );
};

export default VibeCheck;