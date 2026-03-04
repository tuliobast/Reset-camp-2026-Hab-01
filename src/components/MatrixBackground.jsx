import { useEffect, useRef } from "react";
import { FONT_SIZE, MATRIX_CHARS } from "../constants/CONSTANTS";

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drops = Array.from(
      { length: Math.floor(window.innerWidth / FONT_SIZE) },
      () => Math.random() * -100
    );

    let animId, lastTs = 0;
    const frame = (ts) => {
      animId = requestAnimationFrame(frame);
      if (ts - lastTs < 50) return;
      lastTs = ts;

      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;

      drops.forEach((y, i) => {
        ctx.fillStyle = i % 7 === 0 ? "#ccffcc" : "#00ff41";
        ctx.fillText(
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          i * FONT_SIZE,
          y * FONT_SIZE
        );
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

export default MatrixBackground