import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { spaceGroteskFamily } from "../fonts";

export const Background: React.FC<{
  variant?: "dark" | "darker" | "verde";
}> = ({ variant = "dark" }) => {
  const frame = useCurrentFrame();
  const offset = (frame / 4) % 60;

  const bgColor =
    variant === "verde"
      ? THEME.verde
      : variant === "darker"
      ? "#000"
      : THEME.bg;

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${THEME.verdeGlow} 1px, transparent 1px), linear-gradient(90deg, ${THEME.verdeGlow} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          backgroundPosition: `${offset}px ${offset}px`,
          opacity: 0.08,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(124,58,237,0.18), transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 100%, rgba(0,255,135,0.12), transparent 60%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export const OtimizeLogo: React.FC<{ size?: number }> = ({ size = 56 }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: spaceGroteskFamily,
        fontWeight: 700,
        fontSize: size * 0.55,
        color: "#fff",
        letterSpacing: "-0.5px",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${THEME.verde}, ${THEME.purple})`,
          borderRadius: size * 0.28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.5,
        }}
      >
        +
      </div>
      <span>
        OTIMIZE <span style={{ color: THEME.verde }}>Systems</span>
      </span>
    </div>
  );
};
