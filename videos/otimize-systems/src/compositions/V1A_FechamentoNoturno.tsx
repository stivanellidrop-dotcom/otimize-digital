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
import { Caption } from "../components/Caption";
import { WhatsAppMockup, WhatsAppMessage } from "../components/WhatsAppMockup";
import { THEME } from "../theme";
import { interFamily, spaceGroteskFamily } from "../fonts";

// =========================================================
// TESTE GRATIS BADGE — inline
// =========================================================
const TesteGratisBadge: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
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

// =========================================================
// LOGO OTIMIZE
// =========================================================
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
// CENA 1 — 0-3s — Hook: 19h Sua loja fechou
// =========================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  const clockSpring = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 140 },
  });
  const clockScale = interpolate(clockSpring, [0, 1], [0.6, 1]);
  const clockOpacity = interpolate(clockSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const colonOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.25;
  const pulse = 1 + Math.sin(frame / 10) * 0.015;
  const glowAlpha = interpolate(frame, [0, 30, 90], [0, 0.18, 0.25], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 80 : 50,
        padding: isVertical ? "120px 60px" : "60px 60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(239,68,68,${glowAlpha}), transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <Caption
        text="19h. Sua loja fechou."
        highlight="fechou."
        highlightColor={THEME.red}
        fontSize={isVertical ? 110 : 88}
      />
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 360 : 260,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          transform: `scale(${clockScale * pulse})`,
          opacity: clockOpacity,
          textShadow: `0 0 60px rgba(239,68,68,0.4), 0 0 120px rgba(239,68,68,0.2)`,
          display: "flex",
          alignItems: "center",
          gap: isVertical ? 16 : 12,
        }}
      >
        <span>19</span>
        <span style={{ opacity: colonOpacity }}>:</span>
        <span>00</span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-10s — Sem IA
// =========================================================
const TiredEmoji: React.FC<{
  emoji: string;
  delay: number;
  isVertical: boolean;
}> = ({ emoji, delay, isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(entry, [0, 1], [0.4, 1]);
  const wobble = Math.sin((frame - delay) / 8) * 4;
  return (
    <div
      style={{
        fontSize: isVertical ? 72 : 52,
        opacity,
        transform: `scale(${scale}) rotate(${wobble}deg)`,
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
        lineHeight: 1,
      }}
    >
      {emoji}
    </div>
  );
};

const SceneSemIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const messages: WhatsAppMessage[] = [
    { from: 6, side: "in", text: "Tem aquele vestido em M? 19:00" },
    { from: 80, side: "out", text: "Bom dia! Temos sim :) 09:14" },
  ];

  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [-40, 0]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const mockupSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const mockupX = interpolate(mockupSpring, [0, 1], [-200, 0]);
  const mockupOpacity = interpolate(mockupSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const captionSpring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const captionOpacity = interpolate(captionSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionY = interpolate(captionSpring, [0, 1], [30, 0]);

  const mockupScale = isVertical ? 1.0 : 0.75;
  const emojis = [
    { emoji: "😴", delay: 30 },
    { emoji: "😤", delay: 80 },
    { emoji: "😩", delay: 130 },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isVertical ? "flex-start" : "center",
        padding: isVertical ? "70px 0 50px 0" : "30px 60px",
        gap: isVertical ? 22 : 14,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(239,68,68,0.18), transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 86 : 62,
          fontWeight: 800,
          color: THEME.red,
          letterSpacing: "-0.03em",
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          textShadow: "0 4px 24px rgba(239,68,68,0.5)",
          textAlign: "center",
          padding: "0 40px",
          textTransform: "uppercase",
        }}
      >
        Sem IA
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: isVertical ? 24 : 32,
          width: "100%",
          opacity: mockupOpacity,
          transform: `translateX(${mockupX}px)`,
        }}
      >
        <WhatsAppMockup
          contactName="Cliente"
          contactStatus="visto por ultimo 19:00"
          avatarLetter="C"
          avatarColor={THEME.red}
          messages={messages}
          scale={mockupScale}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isVertical ? 24 : 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {emojis.map((e, i) => (
            <TiredEmoji
              key={i}
              emoji={e.emoji}
              delay={e.delay}
              isVertical={isVertical}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 10 : 6,
          marginTop: isVertical ? 14 : 10,
          width: "100%",
          textAlign: "center",
          padding: "0 40px",
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 56 : 38,
            fontWeight: 800,
            color: THEME.red,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          13h depois.
        </div>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 34 : 24,
            fontWeight: 600,
            color: THEME.textMuted,
          }}
        >
          Cliente ja comprou no concorrente.
        </div>
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
          E com <span style={{ color: THEME.verde }}>OTIMIZE</span>?
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
    { from: 8, side: "in", text: "Tem M? 19:00:00" },
    {
      from: 28,
      side: "out",
      imageUrl: `url(${staticFile("products/vestido-floral.jpg")})`,
    },
    {
      from: 48,
      side: "out",
      text: "Sim! Temos M, P e G. Pix ou 3x sem juros 19:00:15",
    },
    { from: 78, side: "out", text: "Posso reservar pra voce?" },
    { from: 130, side: "in", text: "Quero!" },
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
          contactStatus="online agora"
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
            fontSize: isVertical ? 88 : 60,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textShadow: `0 0 40px ${THEME.verdeGlow}, 0 4px 24px rgba(0,255,135,0.4)`,
          }}
        >
          15 segundos.
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 60 : 44,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Venda fechada <span style={{ color: THEME.verde }}>as 19h</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 5 — 22-27s — Cards SEQUENCIAIS (Sequence aninhada)
// =========================================================
const FeatureRow: React.FC<{ text: string; isVertical: boolean }> = ({
  text,
  isVertical,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
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
    "Atende 24h",
    "Responde em 15s",
    "Manda foto e Pix",
    "Fecha venda enquanto voce dorme",
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
          fontSize: isVertical ? 84 : 58,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.03em",
          textAlign: "center",
          lineHeight: 1.1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Seu vendedor que{" "}
        <span style={{ color: THEME.verde }}>nao dorme</span>
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
// COMPOSICAO RAIZ — V1A_FechamentoNoturno (30s @ 30fps = 900 frames)
// =========================================================
export const V1A_FechamentoNoturno: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      <Sequence from={0} durationInFrames={90} name="01-Hook">
        <SceneHook />
      </Sequence>

      <Sequence from={90} durationInFrames={210} name="02-SemIA">
        <SceneSemIA />
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
