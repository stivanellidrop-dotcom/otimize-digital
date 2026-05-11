import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { THEME } from "../theme";
import { spaceGroteskFamily, interFamily } from "../fonts";

export const PriceBadge: React.FC<{
  price?: string;
  subtitle?: string;
  cta?: string;
  scale?: number;
}> = ({
  price = "R$ 597",
  subtitle = "por mês",
  cta = "menos que diária de funcionário",
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const s = interpolate(entry, [0, 1], [0.7, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 8) * 0.02;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16 * scale,
        transform: `scale(${s * pulse})`,
        opacity,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${THEME.verde} 0%, ${THEME.verdeDark} 100%)`,
          color: "#000",
          fontFamily: spaceGroteskFamily,
          fontWeight: 800,
          fontSize: 120 * scale,
          padding: `${24 * scale}px ${48 * scale}px`,
          borderRadius: 24 * scale,
          letterSpacing: "-0.03em",
          boxShadow: `0 20px 80px ${THEME.verdeGlow}, 0 0 0 4px rgba(0,255,135,0.2)`,
          lineHeight: 1,
        }}
      >
        {price}
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 32 * scale,
          color: THEME.textMuted,
          fontWeight: 500,
        }}
      >
        {subtitle}
      </div>
      {cta && (
        <div
          style={{
            fontFamily: interFamily,
            fontSize: 28 * scale,
            color: THEME.text,
            fontWeight: 600,
            marginTop: 8 * scale,
            textAlign: "center",
            opacity: 0.85,
          }}
        >
          {cta}
        </div>
      )}
    </div>
  );
};
