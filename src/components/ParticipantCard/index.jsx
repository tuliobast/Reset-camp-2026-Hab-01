import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ParticipantCard({ participant }) {
const ref = useRef(null);
  const progress = useScrollReveal(ref);

  const glowIntensity = progress * 30;
  const infoOpacity = Math.max(0, (progress - 0.7) / 0.3);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: 280,
        height: 360,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid rgba(0,255,65,${0.2 + progress * 0.8})`,
        boxShadow: `0 0 ${glowIntensity}px rgba(0,255,65,0.4), inset 0 0 ${glowIntensity / 2}px rgba(0,255,65,0.1)`,
        margin: "0 auto",
        transition: "box-shadow 0.1s",
      }}
    >
      {/* Photo */}
      <img
        src={participant.img}
        alt={participant.name}
        style={{
          filter: `
            grayscale(${1 - progress})
            brightness(${0.2 + progress * 0.8})
            contrast(${2 - progress * 1.0})
          `,
        }}
      />

      {/* Matrix overlay */}
      <CardMatrixOverlay opacity={1 - progress} />

      {/* Name + role */}
      <div
        className="name-role"
        style={{
          opacity: infoOpacity,
          transform: `translateY(${(1 - infoOpacity) * 16}px)`,
        }}
      >
        <p className="name">
          {participant.name}
        </p>
        <p className="role">
          {">"} {participant.role}
        </p>
      </div>

      {/* Scan line effect */}
      {progress < 0.95 && (
        <div className="line-effect" 
            style={{
            background: `linear-gradient(transparent ${progress * 100}%, rgba(0,255,65,0.05) ${progress * 100 + 2}%, transparent ${progress * 100 + 4}%)`,
            }} 
        />
      )}
    </div>
  );
}

