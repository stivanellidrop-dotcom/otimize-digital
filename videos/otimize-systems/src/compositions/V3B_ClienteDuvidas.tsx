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
// V3B - Cliente com Dúvidas - 40s @ 30fps - 1200 frames
// Cliente faz 5 perguntas técnicas. Agente responde tudo, fecha venda.
// Revelação: 100% IA. Pitch.
// =============================================================

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

// ---- Cena 1: Hook (0-60 = 0-2s) ----
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
        Cliente <span style={{ color: THEME.verde }}>difícil</span>
        <br />
        de atender?
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 2: WhatsApp 5 dúvidas (60-450 = 2-15s) ----
const SceneWhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // 10 mensagens (5 pares pergunta/resposta). Stagger ~30-45f.
  const messages: WhatsAppMessage[] = [
    { from: 0, side: "out", text: "Esse vestido é de algodão?" },
    {
      from: 30,
      side: "in",
      text: "Esse é de viscolinho 🍃 fresquinho, ideal pra verão",
    },
    { from: 70, side: "out", text: "Sou 70kg, manequim 42, M serve?" },
    {
      from: 100,
      side: "in",
      text: "M serve sim! Modelagem solta. Tabela: PP 36-38, P 40, M 42-44, G 46",
    },
    { from: 150, side: "out", text: "Posso lavar na máquina?" },
    {
      from: 180,
      side: "in",
      text: "Sim 🌀 ciclo delicado. Não passa secadora. Seca à sombra.",
    },
    { from: 225, side: "out", text: "Tô em Belo Horizonte. Chega quando?" },
    {
      from: 255,
      side: "in",
      text: "BH chega em 3-5 dias úteis. Sedex te entrego em 2 dias.",
    },
    { from: 300, side: "out", text: "Fechei! Manda Pix" },
    { from: 330, side: "in", text: "Te mando agora mesmo 💚" },
  ];

  const mockupScale = isSquare ? 0.68 : 0.82;

  const mockupEntry = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const mockupScaleEntry = interpolate(mockupEntry, [0, 1], [0.9, 1]);
  const mockupOpacity = interpolate(mockupEntry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Auto-scroll vertical conforme mensagens se acumulam (subtle)
  const scrollAppear = interpolate(frame, [200, 380], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = interpolate(frame, [375, 390], [1, 0], {
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

// ---- Cena 3: Revelação (450-600 = 15-20s) ----
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
        style={{
          background: "rgba(0,0,0,0.7)",
          pointerEvents: "none",
        }}
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
          gap: isSquare ? 26 : 40,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 70 : 88,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
          }}
        >
          Cada resposta.
          <br />
          <span style={{ color: THEME.verde }}>Em segundos.</span>
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 96 : 124,
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
            100% IA
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 4: 5 cards (600-900 = 20-30s) ----
const SceneCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const cards = [
    "Sabe sobre tecido",
    "Sabe tabela de medidas",
    "Sabe cuidados de lavagem",
    "Sabe prazo de entrega",
    "Fecha venda no Pix",
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

// ---- Cena 5: Comparativo (900-1050 = 30-35s) ----
const SceneCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const humanSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const humanOpacity = interpolate(humanSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const humanTranslate = interpolate(humanSpring, [0, 1], [-40, 0]);

  const iaSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const iaOpacity = interpolate(iaSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const iaScale = interpolate(iaSpring, [0, 1], [0.5, 1]);
  const iaPulse = 1 + Math.sin(Math.max(0, frame - 40) / 7) * 0.04;

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 32 : 50,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 50 : 64,
            fontWeight: 700,
            color: THEME.textMuted,
            letterSpacing: "-0.01em",
            opacity: humanOpacity,
            transform: `translateX(${humanTranslate}px)`,
            textDecoration: "line-through",
          }}
        >
          Vendedor humano: 30 min
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 84 : 110,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            opacity: iaOpacity,
            transform: `scale(${iaScale * iaPulse})`,
          }}
        >
          IA:{" "}
          <span
            style={{
              color: THEME.verde,
              textShadow: `0 0 40px ${THEME.verde}, 0 0 80px ${THEME.verdeGlow}`,
            }}
          >
            90 segundos
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 6: Final CTA (1050-1200 = 35-40s) ----
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
// Composição principal - 1200 frames @ 30fps = 40s
// =============================================================
export const V3B_ClienteDuvidas: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      <Sequence from={0} durationInFrames={60}>
        <SceneHook />
      </Sequence>

      <Sequence from={60} durationInFrames={390}>
        <SceneWhatsApp />
      </Sequence>

      <Sequence from={450} durationInFrames={150}>
        <SceneReveal />
      </Sequence>

      <Sequence from={600} durationInFrames={300}>
        <SceneCards />
      </Sequence>

      <Sequence from={900} durationInFrames={150}>
        <SceneCompare />
      </Sequence>

      <Sequence from={1050} durationInFrames={150}>
        <SceneFinalCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
