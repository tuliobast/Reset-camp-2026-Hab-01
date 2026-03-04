import { useState, useEffect } from "react";

const HeroTitle = () => {
 const text = "BIENVENIDO A RESET CAMP 2026";
  const [revealed, setRevealed] = useState(Array(text.length).fill(false));

  useEffect(() => {
    text.split("").forEach((_, i) => {
      setTimeout(() => {
        setRevealed(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 120);
    });
  }, []);

  return (
    <h1>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            color: revealed[i] ? "#00ff41" : "#003300",
            transition: "color 0.2s",
            display: "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
export default HeroTitle