import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { THEME } from "../theme";
import { spaceGroteskFamily, interFamily } from "../fonts";
import { Background } from "../components/Background";
import {
  WhatsAppMockup,
  WhatsAppMessage,
} from "../components/WhatsAppMockup";

// =============================================================
// V3C - Domingo Madrugada - 35s @ 30fps - 1050 frames
// Lead manda 3h da manhã. Agente responde e vende. Revelação.
// =============================================================

const PRODUCT_IMAGE_BG = `url(${staticFile("products/vestido-floral.jpg")})`;

// ---- Badge inline ----
const TesteGratisBadge: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });
  const s = interpolate(entry, [0, 1], [0.5, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame / 8) * 0.03;
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
          background: `linear-gradient(135deg, #00FF87 0%, #00CC6A 100%)`,
          color: "#000",
          fontFamily: spaceGroteskFamily,
          fontWeight: 800,
          fontSize: 90 * scale,
          padding: `${20 * scale}px ${48 * scale}px`,
          borderRadius: 24 * scale,
          letterSpacing: "-0.02em",
          boxShadow: `0 20px 80px rgba(0,255,135,0.4)`,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        TESTE
        <br />
        GRÁTIS
        <br />
        7 DIAS
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 26 * scale,
          color: "#8892A4",
          fontWeight: 500,
        }}
      >
        Sem cartão. Sem compromisso.
      </div>
    </div>
  );
};

// ---- Cena 1: Hook (0-90 = 0-3s) ----
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const line1Spring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line1Scale = interpolate(line1Spring, [0, 1], [0.7, 1]);

  const line2Spring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 12, stiffness: 170 },
  });
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Scale = interpolate(line2Spring, [0, 1], [0.6, 1]);
  const line2Pulse = 1 + Math.sin(Math.max(0, frame - 20) / 6) * 0.04;

  const exitOpacity = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 28 : 40,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 96 : 130,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.03em",
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: `0 4px 20px rgba(0,0,0,0.6)`,
            lineHeight: 1.05,
          }}
        >
          Domingo.
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 110 : 150,
            fontWeight: 900,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            opacity: line2Opacity,
            transform: `scale(${line2Scale * line2Pulse})`,
            textShadow: `0 0 40px ${THEME.verde}, 0 0 80px ${THEME.verdeGlow}`,
            lineHeight: 1.05,
          }}
        >
          3h da manhã.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 2: WhatsApp 3:14 (90-360 = 3-12s) ----
const SceneWhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const messages: WhatsAppMessage[] = [
    {
      from: 0,
      side: "out",
      text: "Vi seu vestido no insta, ainda tem em M?",
    },
    {
      from: 50,
      side: "in",
      imageUrl: PRODUCT_IMAGE_BG,
      text: "Sim! 💚 Te mostro:",
    },
    {
      from: 105,
      side: "in",
      text: "Floral M disponível 🌸 Pix?",
    },
    {
      from: 150,
      side: "out",
      text: "Pode mandar 🙏",
    },
    {
      from: 195,
      side: "in",
      text: "Chave enviada. Te aviso quando despachar 💸",
    },
  ];

  const mockupScale = isSquare ? 0.72 : 0.86;

  const mockupEntry = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const mockupScaleEntry = interpolate(mockupEntry, [0, 1], [0.9, 1]);
  const mockupOpacity = interpolate(mockupEntry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const captionSpring = spring({
    frame: Math.max(0, frame - 200),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const captionOpacity = interpolate(captionSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionScale = interpolate(captionSpring, [0, 1], [0.7, 1]);

  const sceneOpacity = interpolate(frame, [255, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: sceneOpacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isSquare ? 30 : 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: mockupOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(13,18,32,0.92)",
            border: `2px solid ${THEME.verde}`,
            borderRadius: 100,
            padding: isSquare ? "10px 26px" : "14px 32px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: `0 0 30px ${THEME.verdeGlow}`,
          }}
        >
          <div
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isSquare ? 30 : 38,
              fontWeight: 900,
              color: THEME.verde,
              letterSpacing: "-0.02em",
            }}
          >
            03:14
          </div>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: isSquare ? 22 : 28,
              fontWeight: 600,
              color: THEME.text,
            }}
          >
            domingo
          </div>
        </div>
      </div>

      <div
        style={{
          transform: `scale(${mockupScaleEntry})`,
          opacity: mockupOpacity,
          marginTop: isSquare ? 60 : 120,
        }}
      >
        <WhatsAppMockup
          contactName="Empório Stivanelli"
          contactStatus="online agora"
          avatarLetter="E"
          avatarColor={THEME.verde}
          messages={messages}
          scale={mockupScale}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: isSquare ? 40 : 110,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: captionOpacity,
          transform: `scale(${captionScale})`,
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 44 : 56,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.02em",
            textAlign: "center",
            padding: isSquare ? "16px 32px" : "20px 40px",
            background: "rgba(0,0,0,0.75)",
            borderRadius: 18,
            border: `1px solid ${THEME.verde}`,
            boxShadow: `0 0 30px ${THEME.verdeGlow}`,
          }}
        >
          Você dormindo.{" "}
          <span style={{ color: THEME.verde }}>Loja vendendo.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 3: Revelação (360-510 = 12-17s) ----
const SceneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const glowPulse = 0.5 + Math.sin(frame / 8) * 0.3;

  const line1Spring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line1Scale = interpolate(line1Spring, [0, 1], [0.7, 1]);

  const line2Spring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Scale = interpolate(line2Spring, [0, 1], [0.5, 1]);
  const highlightPulse = 1 + Math.sin(Math.max(0, frame - 32) / 6) * 0.04;

  const sceneOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: sceneOpacity,
      }}
    >
      <AbsoluteFill
        style={{ background: "rgba(0,0,0,0.7)", pointerEvents: "none" }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,${
            glowPulse * 0.4
          }) 0%, transparent 55%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 26 : 42,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 64 : 82,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
          }}
        >
          Quem trabalhou
          <br />
          nessa venda?
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 76 : 96,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            opacity: line2Opacity,
            transform: `scale(${line2Scale * highlightPulse})`,
          }}
        >
          <span
            style={{
              color: THEME.verde,
              textShadow: `0 0 40px ${THEME.verde}, 0 0 80px ${THEME.verdeGlow}`,
            }}
          >
            Agente IA OTIMIZE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 4: 4 cards (510-750 = 17-25s) ----
const SceneCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const cards = [
    "03:14 da manhã",
    "Sem você estar online",
    "Sem você responder",
    "Venda fechada",
  ];

  const cardStartFrames = cards.map((_, i) => 10 + i * 56);

  const sceneOpacity = interpolate(frame, [225, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? "60px 80px" : "120px 80px",
        opacity: sceneOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isSquare ? 22 : 32,
          width: "100%",
          maxWidth: 920,
        }}
      >
        {cards.map((label, i) => {
          const local = frame - cardStartFrames[i];
          if (local < 0) return null;

          const cardSpring = spring({
            frame: local,
            fps,
            config: { damping: 14, stiffness: 180 },
          });
          const opacity = interpolate(cardSpring, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          });
          const translateX = interpolate(cardSpring, [0, 1], [-90, 0]);
          const highlight = interpolate(local, [0, 25], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const borderGlow = 24 + highlight * 24;

          const isFinalCard = i === cards.length - 1;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                background: isFinalCard
                  ? `linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,204,106,0.08))`
                  : "rgba(13, 18, 32, 0.88)",
                border: `2px solid ${THEME.verde}`,
                borderRadius: 22,
                padding: isSquare ? "24px 32px" : "32px 44px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 ${borderGlow}px ${THEME.verdeGlow}`,
              }}
            >
              <div
                style={{
                  width: isSquare ? 56 : 70,
                  height: isSquare ? 56 : 70,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${THEME.verde}, ${THEME.verdeDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isSquare ? 32 : 42,
                  fontWeight: 900,
                  color: "#000",
                  flexShrink: 0,
                  fontFamily: spaceGroteskFamily,
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontFamily: interFamily,
                  fontSize: isSquare ? 36 : 46,
                  fontWeight: isFinalCard ? 900 : 700,
                  color: THEME.text,
                  letterSpacing: "-0.01em",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 5: Caption emocional (750-900 = 25-30s) ----
const SceneEmotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scaleAnim = interpolate(entry, [0, 1], [0.7, 1]);

  const highlightPulse = 1 + Math.sin(frame / 7) * 0.05;

  const sceneOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        opacity: sceneOpacity,
      }}
    >
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isSquare ? 70 : 92,
          fontWeight: 900,
          color: THEME.text,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          opacity,
          transform: `scale(${scaleAnim})`,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        Quanto você{" "}
        <span
          style={{
            color: THEME.verde,
            display: "inline-block",
            transform: `scale(${highlightPulse})`,
            textShadow: `0 0 40px ${THEME.verde}, 0 0 80px ${THEME.verdeGlow}`,
          }}
        >
          perdeu
        </span>
        <br />
        enquanto dormia ontem?
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 6: Final CTA (900-1050 = 30-35s) ----
const SceneFinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const logoSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoTranslate = interpolate(logoSpring, [0, 1], [20, 0]);

  const contactSpring = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const contactOpacity = interpolate(contactSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contactTranslate = interpolate(contactSpring, [0, 1], [20, 0]);

  const logoSize = isSquare ? 120 : 150;
  const badgeScale = isSquare ? 0.58 : 0.75;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? "40px 50px" : "40px 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 22 : 32,
          textAlign: "center",
        }}
      >
        <TesteGratisBadge scale={badgeScale} />

        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoTranslate}px)`,
            filter: `drop-shadow(0 0 30px ${THEME.verdeGlow})`,
          }}
        >
          <Img
            src={staticFile("otimize-logo.svg")}
            style={{ width: logoSize, height: logoSize, display: "block" }}
          />
        </div>

        <div
          style={{
            opacity: contactOpacity,
            transform: `translateY(${contactTranslate}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isSquare ? 10 : 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(13, 18, 32, 0.85)",
              border: `2px solid ${THEME.verde}`,
              borderRadius: 18,
              padding: isSquare ? "12px 22px" : "16px 28px",
              boxShadow: `0 8px 30px ${THEME.verdeGlow}`,
              fontFamily: interFamily,
              fontSize: isSquare ? 26 : 32,
              fontWeight: 700,
              color: THEME.text,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: THEME.verde }}>WhatsApp</span>
            <span>(11) 97820-2286</span>
          </div>
          <div
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isSquare ? 28 : 36,
              fontWeight: 800,
              color: THEME.text,
              letterSpacing: "-0.02em",
              textShadow: `0 0 16px ${THEME.verdeGlow}`,
            }}
          >
            otimize.digital
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// Composição principal - 1050 frames @ 30fps = 35s
// =============================================================
export const V3C_DomingoMadrugada: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      <Sequence from={0} durationInFrames={90}>
        <SceneHook />
      </Sequence>

      <Sequence from={90} durationInFrames={270}>
        <SceneWhatsApp />
      </Sequence>

      <Sequence from={360} durationInFrames={150}>
        <SceneReveal />
      </Sequence>

      <Sequence from={510} durationInFrames={240}>
        <SceneCards />
      </Sequence>

      <Sequence from={750} durationInFrames={150}>
        <SceneEmotion />
      </Sequence>

      <Sequence from={900} durationInFrames={150}>
        <SceneFinalCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
