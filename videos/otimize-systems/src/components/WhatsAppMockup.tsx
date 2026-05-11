import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { THEME } from "../theme";
import { interFamily } from "../fonts";

export type WhatsAppMessage = {
  from: number;
  side: "in" | "out";
  text?: string;
  imageUrl?: string;
};

export const WhatsAppMockup: React.FC<{
  contactName: string;
  contactStatus?: string;
  avatarLetter?: string;
  avatarColor?: string;
  messages: WhatsAppMessage[];
  scale?: number;
}> = ({
  contactName,
  contactStatus = "online agora",
  avatarLetter = "O",
  avatarColor = THEME.verde,
  messages,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: 540 * scale,
        height: 1100 * scale,
        background: THEME.whatsappBg,
        borderRadius: 36 * scale,
        boxShadow: `0 25px 80px rgba(0,0,0,0.6), 0 0 0 12px #1a1a1a`,
        overflow: "hidden",
        fontFamily: interFamily,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          height: 36 * scale,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${24 * scale}px`,
          color: THEME.whatsappText,
          fontSize: 14 * scale,
          fontWeight: 600,
        }}
      >
        <span>9:41</span>
        <span>4G</span>
      </div>

      <div
        style={{
          background: THEME.whatsappHeader,
          padding: `${14 * scale}px ${18 * scale}px`,
          display: "flex",
          alignItems: "center",
          gap: 14 * scale,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <div
          style={{
            width: 48 * scale,
            height: 48 * scale,
            borderRadius: "50%",
            background: avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22 * scale,
            fontWeight: 700,
            color: "#000",
          }}
        >
          {avatarLetter}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: THEME.whatsappText,
              fontWeight: 600,
              fontSize: 18 * scale,
            }}
          >
            {contactName}
          </div>
          <div
            style={{
              color: THEME.whatsappTextMuted,
              fontSize: 13 * scale,
            }}
          >
            {contactStatus}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: `${18 * scale}px ${16 * scale}px`,
          display: "flex",
          flexDirection: "column",
          gap: 10 * scale,
          overflow: "hidden",
          background: `linear-gradient(180deg, ${THEME.whatsappBg} 0%, #0d1418 100%)`,
        }}
      >
        {messages.map((msg, i) => {
          const local = frame - msg.from;
          if (local < 0) return null;

          const appear = spring({
            frame: local,
            fps,
            config: { damping: 18, stiffness: 200 },
          });
          const translateY = interpolate(appear, [0, 1], [12, 0]);
          const opacity = interpolate(appear, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          });

          const isOut = msg.side === "out";

          return (
            <div
              key={i}
              style={{
                alignSelf: isOut ? "flex-end" : "flex-start",
                maxWidth: "78%",
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div
                style={{
                  background: isOut
                    ? THEME.whatsappBubbleOut
                    : THEME.whatsappBubbleIn,
                  color: THEME.whatsappText,
                  padding: `${10 * scale}px ${14 * scale}px`,
                  borderRadius: 12 * scale,
                  borderTopLeftRadius: isOut ? 12 * scale : 0,
                  borderTopRightRadius: isOut ? 0 : 12 * scale,
                  fontSize: 16 * scale,
                  lineHeight: 1.35,
                  boxShadow: "0 1px 1px rgba(0,0,0,0.4)",
                }}
              >
                {msg.imageUrl && (
                  <div
                    style={{
                      width: 280 * scale,
                      height: 280 * scale,
                      background: msg.imageUrl,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 8 * scale,
                      marginBottom: msg.text ? 8 * scale : 0,
                    }}
                  />
                )}
                {msg.text && <div>{msg.text}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
