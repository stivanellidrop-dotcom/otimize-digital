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
// V3D - Cliente Difícil - 40s @ 30fps - 1200 frames
// Cliente indeciso com 8 perguntas. Agente responde tudo com paciência.
// Revelação humor: IA não cansa.
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

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scaleAnim = interpolate(entry, [0, 1], [0.7, 1]);

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
          fontFamily: spaceGroteskFamily,
          fontSize: isSquare ? 96 : 130,
          fontWeight: 900,
          color: THEME.text,
          letterSpacing: "-0.03em",
          textAlign: "center",
          opacity,
          transform: `scale(${scaleAnim})`,
          textShadow: `0 0 40px ${THEME.verdeGlow}, 0 4px 20px rgba(0,0,0,0.6)`,
          lineHeight: 1.05,
          padding: "0 60px",
        }}
      >
        Esse tipo de
        <br />
        <span style={{ color: THEME.verde }}>cliente:</span>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 2: WhatsApp longo (90-540 = 3-18s) ----
const SceneWhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const messages: WhatsAppMessage[] = [
    { from: 0, side: "out", text: "Tô em dúvida..." },
    { from: 30, side: "in", text: "Sem pressa! Te ajudo a decidir 😊" },
    { from: 65, side: "out", text: "Manda outra foto" },
    {
      from: 95,
      side: "in",
      imageUrl: PRODUCT_IMAGE_BG,
      text: "Aqui ó, mais um ângulo",
    },
    { from: 150, side: "out", text: "E em P?" },
    { from: 180, side: "in", text: "Em P fica mais justo, te mostro?" },
    { from: 220, side: "out", text: "Tem desconto?" },
    { from: 250, side: "in", text: "À vista no Pix te dou 5% off 💸" },
    { from: 290, side: "out", text: "Frete grátis?" },
    { from: 320, side: "in", text: "Acima de R$200 sim. Hoje você passa" },
    { from: 360, side: "out", text: "Tá... vou pensar" },
    { from: 390, side: "in", text: "Sem stress 💚 te chamo amanhã se quiser" },
  ];

  const mockupScale = isSquare ? 0.66 : 0.8;

  const mockupEntry = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const mockupScaleEntry = interpolate(mockupEntry, [0, 1], [0.9, 1]);
  const mockupOpacity = interpolate(mockupEntry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Auto-scroll forte conforme conversa cresce
  const scrollAppear = interpolate(frame, [220, 430], [0, -260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(frame, [435, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: sceneOpacity,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          transform: `scale(${mockupScaleEntry}) translateY(${scrollAppear}px)`,
          opacity: mockupOpacity,
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
    </AbsoluteFill>
  );
};

// ---- Cena 3: Revelação humor (540-690 = 18-23s) ----
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
          gap: isSquare ? 28 : 44,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 82 : 110,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
          }}
        >
          Você cansaria?
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 100 : 130,
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
            IA não cansa.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 4: 5 cards (690-990 = 23-33s) ----
const SceneCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const cards = [
    "Paciência infinita",
    "0 dia de mau humor",
    "Sempre cordial",
    "Mesmo padrão sempre",
    "Lead nunca esfria",
  ];

  const cardStartFrames = cards.map((_, i) => 10 + i * 56);

  const sceneOpacity = interpolate(frame, [285, 300], [1, 0], {
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
          gap: isSquare ? 18 : 28,
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

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                background: "rgba(13, 18, 32, 0.88)",
                border: `2px solid ${THEME.verde}`,
                borderRadius: 22,
                padding: isSquare ? "22px 30px" : "30px 42px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 ${borderGlow}px ${THEME.verdeGlow}`,
              }}
            >
              <div
                style={{
                  width: isSquare ? 50 : 64,
                  height: isSquare ? 50 : 64,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${THEME.verde}, ${THEME.verdeDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isSquare ? 30 : 38,
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
                  fontSize: isSquare ? 32 : 42,
                  fontWeight: 700,
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

// ---- Cena 5: Final CTA (990-1200 = 33-40s) ----
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
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const contactOpacity = interpolate(contactSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contactTranslate = interpolate(contactSpring, [0, 1], [20, 0]);

  const logoSize = isSquare ? 120 : 150;
  const badgeScale = isSquare ? 0.6 : 0.78;

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
          gap: isSquare ? 24 : 36,
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
            gap: isSquare ? 12 : 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
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
// Composição principal - 1200 frames @ 30fps = 40s
// =============================================================
export const V3D_ClienteDificil: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      <Sequence from={0} durationInFrames={90}>
        <SceneHook />
      </Sequence>

      <Sequence from={90} durationInFrames={450}>
        <SceneWhatsApp />
      </Sequence>

      <Sequence from={540} durationInFrames={150}>
        <SceneReveal />
      </Sequence>

      <Sequence from={690} durationInFrames={300}>
        <SceneCards />
      </Sequence>

      <Sequence from={990} durationInFrames={210}>
        <SceneFinalCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
