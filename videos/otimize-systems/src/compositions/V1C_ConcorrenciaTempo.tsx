import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
} from "remotion";
import { Background } from "../components/Background";
import { WhatsAppMockup, WhatsAppMessage } from "../components/WhatsAppMockup";
import { THEME } from "../theme";
import { interFamily, spaceGroteskFamily } from "../fonts";

// =========================================================
// TESTE GRATIS BADGE — inline
// =========================================================
const TesteGratisBadge: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });
  const s = interpolate(entry, [0, 1], [0.5, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], { extrapolateRight: "clamp" });
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
        GRATIS
        <br />7 DIAS
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 26 * scale,
          color: "#8892A4",
          fontWeight: 500,
        }}
      >
        Sem cartao. Sem compromisso.
      </div>
    </div>
  );
};

const OtimizeLogoImg: React.FC<{ size?: number }> = ({ size = 200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const scale = interpolate(entry, [0, 1], [0.5, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = 0.5 + Math.sin(frame / 8) * 0.3;
  const scalePulse = 1 + Math.sin(frame / 10) * 0.02;
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale * scalePulse})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -size * 0.15,
          background: `radial-gradient(circle, rgba(0,255,135,${glowPulse}) 0%, transparent 65%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <Img
        src={staticFile("otimize-logo.svg")}
        style={{
          width: size,
          height: size,
          position: "relative",
          zIndex: 1,
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
        }}
      />
    </div>
  );
};

// =========================================================
// CENA 1 — 0-3s — Hook: 3 linhas dramaticas
// =========================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const lineSpring = (delay: number) =>
    spring({
      frame: frame - delay,
      fps,
      config: { damping: 16, stiffness: 160 },
    });

  const l1 = lineSpring(0);
  const l2 = lineSpring(20);
  const l3 = lineSpring(40);

  const rows = [
    { text: "2 lojistas.", color: THEME.red, s: l1 },
    { text: "Mesmo produto.", color: THEME.text, s: l2 },
    { text: "Mesmo cliente.", color: THEME.verde, s: l3 },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 36 : 20,
        padding: isVertical ? "120px 60px" : "60px 60px",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 130 : 92,
            fontWeight: 800,
            color: row.color,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            opacity: interpolate(row.s, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(row.s, [0, 1], [40, 0])}px)`,
            textShadow:
              row.color === THEME.red
                ? "0 4px 24px rgba(239,68,68,0.4)"
                : row.color === THEME.verde
                ? "0 4px 24px rgba(0,255,135,0.4)"
                : "0 4px 24px rgba(0,0,0,0.5)",
            textAlign: "center",
          }}
        >
          {row.text}
        </div>
      ))}
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-10s — Split: Loja A (4h) vs Loja B (15s)
// =========================================================
const SplitPanel: React.FC<{
  side: "A" | "B";
  isVertical: boolean;
}> = ({ side, isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isWinner = side === "B";
  const labelColor = isWinner ? THEME.verde : THEME.red;
  const headline = isWinner ? "Loja B: 15s" : "Loja A: 4h depois";

  const messages: WhatsAppMessage[] = isWinner
    ? [
        { from: 12, side: "in", text: "Tem M? 14:00:00" },
        { from: 26, side: "out", text: "Sim! M, P, G. R$89 Pix 14:00:15" },
        { from: 60, side: "in", text: "Quero 1 M!" },
        { from: 90, side: "out", text: "Reservado. Pix abaixo 💚" },
      ]
    : [
        { from: 12, side: "in", text: "Tem M? 14:00" },
        { from: 90, side: "out", text: "Oi, tem sim 18:00" },
        { from: 110, side: "in", text: "Ja comprei em outra :(" },
      ];

  const panelSpring = spring({
    frame: frame - (isWinner ? 12 : 0),
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const opacity = interpolate(panelSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(panelSpring, [0, 1], [isWinner ? 40 : -40, 0]);

  const winnerGlow = isWinner ? 0.3 + Math.sin(frame / 10) * 0.1 : 0;

  const headlineSize = isVertical ? 56 : 36;
  const mockupScale = isVertical ? 0.85 : 0.55;

  return (
    <div
      style={{
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: isVertical ? "40px 20px" : "20px 16px",
        gap: isVertical ? 20 : 12,
        opacity,
        transform: `translateY(${y}px)`,
        position: "relative",
      }}
    >
      <AbsoluteFill
        style={{
          background: isWinner
            ? `radial-gradient(ellipse at 50% 50%, rgba(0,255,135,${winnerGlow}), transparent 60%)`
            : `radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.2), transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: headlineSize,
          fontWeight: 800,
          color: labelColor,
          letterSpacing: "-0.03em",
          textShadow: `0 2px 16px ${
            isWinner ? "rgba(0,255,135,0.5)" : "rgba(239,68,68,0.5)"
          }`,
          textTransform: "uppercase",
          textAlign: "center",
          padding: "8px 16px",
          background: "rgba(0,0,0,0.4)",
          borderRadius: 8,
          border: `2px solid ${labelColor}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {headline}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <WhatsAppMockup
          contactName={isWinner ? "OTIMIZE Bot" : "Loja A"}
          contactStatus={isWinner ? "online agora" : "off"}
          avatarLetter={isWinner ? "O" : "A"}
          avatarColor={labelColor}
          messages={messages}
          scale={mockupScale}
        />
      </div>
    </div>
  );
};

const SceneSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const captionSpring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const captionOpacity = interpolate(captionSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionY = interpolate(captionSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: isVertical ? "40px 0 30px 0" : "20px 0",
        gap: isVertical ? 16 : 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flex: 1,
          gap: 8,
        }}
      >
        <SplitPanel side="A" isVertical={isVertical} />
        <div
          style={{
            width: 2,
            background: `linear-gradient(180deg, transparent, ${THEME.text}, transparent)`,
            opacity: 0.3,
          }}
        />
        <SplitPanel side="B" isVertical={isVertical} />
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 56 : 36,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.02em",
          textAlign: "center",
          padding: "0 40px",
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
          lineHeight: 1.1,
        }}
      >
        Quem responde primeiro{" "}
        <span style={{ color: THEME.verde }}>VENDE</span>.
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 3 — 10-13s — Transicao
// =========================================================
const SceneTransicao: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const darkOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const flashOpacity = interpolate(frame, [15, 22, 40], [0, 1, 0], {
    extrapolateRight: "clamp",
  });
  const headlineSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const headlineScale = interpolate(headlineSpring, [0, 1], [0.6, 1]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: darkOpacity }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${THEME.verde} 0%, transparent 70%)`,
          opacity: flashOpacity,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 110 : 84,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.1,
            transform: `scale(${headlineScale})`,
            opacity: headlineOpacity,
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
          }}
        >
          Voce quer ser{" "}
          <span style={{ color: THEME.verde }}>qual</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 4 — 13-22s — Com OTIMIZE
// =========================================================
const SceneComOtimize: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const messages: WhatsAppMessage[] = [
    { from: 8, side: "in", text: "Tem M? 14:00:00" },
    {
      from: 22,
      side: "out",
      imageUrl: `url(${staticFile("products/vestido-floral.jpg")})`,
    },
    { from: 38, side: "out", text: "Sim! M, P, G — R$89,90 Pix 14:00:15" },
    { from: 60, side: "out", text: "Reservo pra voce?" },
    { from: 110, side: "in", text: "Quero!" },
    { from: 130, side: "out", text: "Pix gerado 💚" },
  ];

  const headlineSpring = spring({
    frame: frame - 175,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headlineScale = interpolate(headlineSpring, [0, 1], [0.7, 1]);

  const mockupSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const mockupY = interpolate(mockupSpring, [0, 1], [60, 0]);
  const mockupOpacity = interpolate(mockupSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const successGlow = interpolate(frame, [150, 180, 270], [0, 0.35, 0.25], {
    extrapolateRight: "clamp",
  });
  const mockupScale = isVertical ? 1.3 : 0.95;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isVertical ? "flex-start" : "center",
        padding: isVertical ? "100px 0 80px 0" : "40px 60px",
        gap: isVertical ? 30 : 20,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(0,255,135,${successGlow}), transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: mockupOpacity,
          transform: `translateY(${mockupY}px)`,
        }}
      >
        <WhatsAppMockup
          contactName="OTIMIZE Bot"
          contactStatus="sempre 1o a responder"
          avatarLetter="O"
          avatarColor={THEME.verde}
          messages={messages}
          scale={mockupScale}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 12 : 8,
          opacity: headlineOpacity,
          transform: `scale(${headlineScale})`,
          marginTop: isVertical ? 20 : 10,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 84 : 60,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textShadow: `0 0 40px ${THEME.verdeGlow}, 0 4px 24px rgba(0,255,135,0.4)`,
          }}
        >
          7 a cada 10
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 56 : 40,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          batalhas <span style={{ color: THEME.verde }}>ganhas</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 5 — 22-27s — Cards SEQUENCIAIS
// =========================================================
const FeatureRow: React.FC<{ text: string; isVertical: boolean }> = ({
  text,
  isVertical,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame, fps, config: { damping: 16, stiffness: 180 } });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(entry, [0, 1], [-60, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isVertical ? 28 : 22,
        opacity,
        transform: `translateX(${translateX}px)`,
        padding: isVertical ? "18px 36px" : "14px 28px",
        background: "rgba(0,255,135,0.08)",
        borderLeft: `6px solid ${THEME.verde}`,
        borderRadius: 12,
        width: "100%",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: isVertical ? 52 : 42,
          height: isVertical ? 52 : 42,
          minWidth: isVertical ? 52 : 42,
          borderRadius: "50%",
          background: THEME.verde,
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: spaceGroteskFamily,
          fontWeight: 800,
          fontSize: isVertical ? 28 : 22,
        }}
      >
        {"✓"}
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: isVertical ? 42 : 30,
          fontWeight: 600,
          color: THEME.text,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SceneResumo: React.FC = () => {
  const { height, width, fps } = useVideoConfig();
  const isVertical = height > width;
  const frame = useCurrentFrame();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);

  const features = [
    "Sempre 1o a responder",
    "Vence concorrencia",
    "Cliente fecha contigo",
    "Concorrente fica pra tras",
  ];

  const startOffset = 22;
  const stepOffset = 22;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "120px 80px" : "60px 120px",
        gap: isVertical ? 44 : 28,
      }}
    >
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 80 : 56,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.03em",
          textAlign: "center",
          lineHeight: 1.1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Voce ganha,{" "}
        <span style={{ color: THEME.verde }}>concorrente perde</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isVertical ? 22 : 16,
          width: "100%",
          maxWidth: isVertical ? 900 : 760,
        }}
      >
        {features.map((text, i) => (
          <Sequence
            key={i}
            from={startOffset + i * stepOffset}
            durationInFrames={150 - (startOffset + i * stepOffset)}
            name={`feature-${i}`}
          >
            <FeatureRow text={text} isVertical={isVertical} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 6 — 27-30s — Final
// =========================================================
const SceneFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const waSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const waOpacity = interpolate(waSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const waScale = interpolate(waSpring, [0, 1], [0.8, 1]);
  const wapPulse = 1 + Math.sin(frame / 6) * 0.025;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "80px 60px" : "40px 80px",
        gap: isVertical ? 28 : 18,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <TesteGratisBadge scale={isVertical ? 0.9 : 0.6} />
      <OtimizeLogoImg size={isVertical ? 220 : 160} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 10 : 6,
          opacity: waOpacity,
          transform: `scale(${waScale * wapPulse})`,
          marginTop: isVertical ? 10 : 6,
        }}
      >
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 26 : 20,
            fontWeight: 500,
            color: THEME.textMuted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Fale pelo WhatsApp
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 54 : 38,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.02em",
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
            padding: isVertical ? "14px 36px" : "10px 28px",
            border: `3px solid ${THEME.verde}`,
            borderRadius: 16,
            background: "rgba(0,255,135,0.08)",
          }}
        >
          (11) 97820-2286
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// COMPOSICAO RAIZ — V1C_ConcorrenciaTempo (30s @ 30fps = 900 frames)
// =========================================================
export const V1C_ConcorrenciaTempo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      <Sequence from={0} durationInFrames={90} name="01-Hook">
        <SceneHook />
      </Sequence>

      <Sequence from={90} durationInFrames={210} name="02-Split">
        <SceneSplit />
      </Sequence>

      <Sequence from={300} durationInFrames={90} name="03-Transicao">
        <SceneTransicao />
      </Sequence>

      <Sequence from={390} durationInFrames={270} name="04-ComOtimize">
        <SceneComOtimize />
      </Sequence>

      <Sequence from={660} durationInFrames={150} name="05-Resumo">
        <SceneResumo />
      </Sequence>

      <Sequence from={810} durationInFrames={90} name="06-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
