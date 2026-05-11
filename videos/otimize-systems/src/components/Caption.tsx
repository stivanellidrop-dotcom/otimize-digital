import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { THEME } from "../theme";
import { spaceGroteskFamily } from "../fonts";

export const Caption: React.FC<{
  text: string;
  highlight?: string;
  highlightColor?: string;
  fontSize?: number;
  align?: "left" | "center" | "right";
  bold?: boolean;
}> = ({
  text,
  highlight,
  highlightColor = THEME.verde,
  fontSize = 64,
  align = "center",
  bold = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 180 },
  });

  const opacity = interpolate(appear, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(appear, [0, 1], [40, 0]);

  const parts = highlight && text.includes(highlight)
    ? text.split(highlight)
    : [text];

  return (
    <div
      style={{
        fontFamily: spaceGroteskFamily,
        fontSize,
        fontWeight: bold ? 800 : 500,
        color: THEME.text,
        textAlign: align,
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        opacity,
        transform: `translateY(${translateY}px)`,
        textShadow: "0 2px 16px rgba(0,0,0,0.5)",
        padding: "0 40px",
      }}
    >
      {parts.length === 2 ? (
        <>
          {parts[0]}
          <span style={{ color: highlightColor }}>{highlight}</span>
          {parts[1]}
        </>
      ) : (
        text
      )}
    </div>
  );
};

export const Typewriter: React.FC<{
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  color?: string;
  bold?: boolean;
}> = ({
  text,
  startFrame = 0,
  charsPerFrame = 0.5,
  fontSize = 56,
  color = THEME.text,
  bold = true,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
  const visible = text.slice(0, charsToShow);
  const showCaret = Math.floor(elapsed / 15) % 2 === 0;

  return (
    <div
      style={{
        fontFamily: spaceGroteskFamily,
        fontSize,
        fontWeight: bold ? 800 : 500,
        color,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
      }}
    >
      {visible}
      {charsToShow < text.length && showCaret && (
        <span style={{ color: THEME.verde }}>|</span>
      )}
    </div>
  );
};
