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
// V3A - Empório Floral - "Show-Don't-Tell / Revelação" - 40s @ 30fps
// 1200 frames totais.
// Mostra conversa real Empório Stivanelli -> revela que é IA -> pitch.
// =============================================================

const PRODUCT_IMAGE_BG = `url(${staticFile("products/vestido-floral.jpg")})`;

// ---- Badge inline reutilizável ----
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

// ---- Cena 1: Hook "Você reparou?" (0-60 = 0-2s) ----
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

  const exitOpacity = interpolate(frame, [48, 60], [1, 0], {
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
          fontSize: isSquare ? 120 : 160,
          fontWeight: 900,
          color: THEME.text,
          letterSpacing: "-0.03em",
          textAlign: "center",
          opacity,
          transform: `scale(${scaleAnim})`,
          textShadow: `0 0 40px ${THEME.verdeGlow}, 0 4px 20px rgba(0,0,0,0.6)`,
          lineHeight: 1.05,
        }}
      >
        Você <span style={{ color: THEME.verde }}>reparou?</span>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 2: WhatsApp Empório Stivanelli (60-360 = 2-12s) ----
const SceneWhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // Timing local da Sequence (já offsetada em 60 globais).
  // 6 mensagens com beat de ~40 frames entre cada.
  const messages: WhatsAppMessage[] = [
    {
      from: 0,
      side: "in",
      text: "Oi! 💚 Sou Ygor do Empório Stivanelli. O que tá procurando?",
    },
    {
      from: 40,
      side: "out",
      text: "Vestido floral M",
    },
    {
      from: 80,
      side: "in",
      imageUrl: PRODUCT_IMAGE_BG,
      text: "Esse é o Francine 🌸 Viscolinho, 3x sem juros",
    },
    {
      from: 130,
      side: "out",
      text: "Adorei! Quero",
    },
    {
      from: 165,
      side: "in",
      text: "Te mando o link de pgto agora 💸",
    },
  ];

  const mockupScale = isSquare ? 0.78 : 0.92;

  const mockupEntry = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const mockupScaleEntry = interpolate(mockupEntry, [0, 1], [0.9, 1]);
  const mockupOpacity = interpolate(mockupEntry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out final
  const sceneOpacity = interpolate(frame, [285, 300], [1, 0], {
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
          transform: `scale(${mockupScaleEntry})`,
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

// ---- Cena 3: Revelação - tela escurece + glow + caption gigante (360-510 = 12-17s) ----
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
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Scale = interpolate(line2Spring, [0, 1], [0.5, 1]);
  const highlightPulse = 1 + Math.sin(Math.max(0, frame - 30) / 6) * 0.04;

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
      {/* Camada escura por cima do fundo */}
      <AbsoluteFill
        style={{
          background: "rgba(0,0,0,0.65)",
          pointerEvents: "none",
        }}
      />
      {/* Glow verde central pulsante */}
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
          gap: isSquare ? 28 : 42,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 64 : 80,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
          }}
        >
          Tudo que você acabou de ver
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 80 : 100,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            opacity: line2Opacity,
            transform: `scale(${line2Scale * highlightPulse})`,
          }}
        >
          foi feito{" "}
          <span
            style={{
              color: THEME.verde,
              textShadow: `0 0 40px ${THEME.verde}, 0 0 80px ${THEME.verdeGlow}`,
            }}
          >
            100% por agente IA
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 4: 5 cards SEQUENCIAIS (510-810 = 17-27s) ----
// Cada card aparece e fica visível (acumulação visual), entrando em offsets de ~56f.
const SceneCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const cards = [
    "Boas vindas personalizadas",
    "Catálogo automático",
    "Foto do produto enviada",
    "Negociação e venda",
    "Follow-up de pagamento",
  ];

  // Cada card entra escalonado e fica no DOM. NUNCA sobrepostos (stack vertical).
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

// ---- Cena 5: "Imagina isso atendendo NA SUA loja" (810-960 = 27-32s) ----
const ScenePitch: React.FC = () => {
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

  const suaPulse = 1 + Math.sin(frame / 7) * 0.08;
  const suaGlow = 0.6 + Math.sin(frame / 6) * 0.4;

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
          fontSize: isSquare ? 76 : 100,
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
        Imagina isso atendendo na{" "}
        <span
          style={{
            color: THEME.verde,
            display: "inline-block",
            transform: `scale(${suaPulse})`,
            textShadow: `0 0 ${30 * suaGlow}px ${THEME.verde}, 0 0 ${
              60 * suaGlow
            }px ${THEME.verdeGlow}`,
          }}
        >
          SUA
        </span>{" "}
        loja
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 6: TesteGratis + Logo + Contato (960-1200 = 32-40s) ----
const SceneFinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const logoSpring = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoTranslate = interpolate(logoSpring, [0, 1], [20, 0]);

  const contactSpring = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const contactOpacity = interpolate(contactSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contactTranslate = interpolate(contactSpring, [0, 1], [20, 0]);

  const logoSize = isSquare ? 130 : 160;
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
          gap: isSquare ? 26 : 40,
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
              padding: isSquare ? "14px 24px" : "18px 30px",
              boxShadow: `0 8px 30px ${THEME.verdeGlow}`,
              fontFamily: interFamily,
              fontSize: isSquare ? 28 : 34,
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
              fontSize: isSquare ? 30 : 38,
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
export const V3A_EmporioFloral: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* 0-2s */}
      <Sequence from={0} durationInFrames={60}>
        <SceneHook />
      </Sequence>

      {/* 2-12s */}
      <Sequence from={60} durationInFrames={300}>
        <SceneWhatsApp />
      </Sequence>

      {/* 12-17s */}
      <Sequence from={360} durationInFrames={150}>
        <SceneReveal />
      </Sequence>

      {/* 17-27s */}
      <Sequence from={510} durationInFrames={300}>
        <SceneCards />
      </Sequence>

      {/* 27-32s */}
      <Sequence from={810} durationInFrames={150}>
        <ScenePitch />
      </Sequence>

      {/* 32-40s */}
      <Sequence from={960} durationInFrames={240}>
        <SceneFinalCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
