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
  Audio,
} from "remotion";
import { Background } from "../components/Background";
import { Caption } from "../components/Caption";
import { WhatsAppMockup, WhatsAppMessage } from "../components/WhatsAppMockup";
import { THEME } from "../theme";
import { interFamily, spaceGroteskFamily } from "../fonts";

// =========================================================
// LOGO OTIMIZE Systems — usa imagem real (staticFile)
// =========================================================
const OtimizeLogoImg: React.FC<{ size?: number; pulse?: boolean }> = ({
  size = 200,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const scale = interpolate(entry, [0, 1], [0.5, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow pulsante
  const glowPulse = pulse ? 0.5 + Math.sin(frame / 8) * 0.3 : 0.5;
  const scalePulse = pulse ? 1 + Math.sin(frame / 10) * 0.02 : 1;

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
      {/* Glow atras */}
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
// CENA 1 — 0-3s (frames 0-90) — Setup: "19h. Sua loja fechou."
// =========================================================
const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const clockSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const clockScale = interpolate(clockSpring, [0, 1], [0.6, 1]);
  const clockOpacity = interpolate(clockSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const colonOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.25;
  const pulse = 1 + Math.sin(frame / 10) * 0.015;

  const glowAlpha = interpolate(
    frame,
    [0, 30, 60, 90],
    [0, 0.18, 0.22, 0.25],
    { extrapolateRight: "clamp" }
  );

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

      <div
        style={{
          fontFamily: interFamily,
          fontSize: isVertical ? 38 : 30,
          color: THEME.textMuted,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: clockOpacity,
        }}
      >
        Mas seus clientes ainda estao acordados...
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-9s (frames 90-270) — Loja SEM IA + relogio acelerado + emojis cansados
// =========================================================
const AcceleratedClock: React.FC<{ isVertical: boolean }> = ({ isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relogio inicia em 19:00:00 e acelera ate 09:14:23
  // 14h 14min 23s = 51263 segundos totais (passagem da noite)
  const totalSeconds = 51263;
  const animDuration = 150; // frames de animacao
  const progress = Math.min(1, frame / animDuration);
  // Easing exponencial pra dar sensacao de aceleracao
  const eased = Math.pow(progress, 0.7);
  const elapsed = Math.floor(eased * totalSeconds);

  // Comeca em 19:00:00, adiciona elapsed segundos
  const startSeconds = 19 * 3600;
  const currentTotal = (startSeconds + elapsed) % (24 * 3600);
  const h = Math.floor(currentTotal / 3600);
  const m = Math.floor((currentTotal % 3600) / 60);
  const s = currentTotal % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  // Cor varia conforme avanca (mais vermelho com tempo)
  const redBlend = interpolate(progress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const entry = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const entryOpacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const entryY = interpolate(entry, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        fontFamily: spaceGroteskFamily,
        fontSize: isVertical ? 96 : 64,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color: THEME.text,
        textShadow: `0 0 ${24 + redBlend * 40}px rgba(239,68,68,${0.3 + redBlend * 0.5})`,
        opacity: entryOpacity,
        transform: `translateY(${entryY}px)`,
        background: `rgba(0,0,0,0.55)`,
        padding: isVertical ? "16px 32px" : "10px 22px",
        borderRadius: 16,
        border: `2px solid rgba(239,68,68,${0.3 + redBlend * 0.5})`,
        display: "inline-flex",
        alignItems: "center",
        gap: isVertical ? 14 : 10,
      }}
    >
      <span>{pad(h)}</span>
      <span style={{ opacity: 0.6 }}>:</span>
      <span>{pad(m)}</span>
      <span style={{ opacity: 0.6 }}>:</span>
      <span>{pad(s)}</span>
    </div>
  );
};

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

  // Wobble sutil
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
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Mensagens com horarios — cliente 19:00, loja so 09:14
  const messages: WhatsAppMessage[] = [
    { from: 6, side: "in", text: "Tem M dessa peca? 19:00" },
    { from: 60, side: "out", text: "Bom dia, ainda temos sim! 09:14" },
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

  const footer1 = spring({
    frame: frame - 120,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const footer2 = spring({
    frame: frame - 140,
    fps,
    config: { damping: 16, stiffness: 180 },
  });

  const mockupScale = isVertical ? 1.1 : 0.8;

  // Emojis cansados acumulando — cada ~60 frames (~2s) conforme spec
  const emojis = [
    { emoji: "😴", delay: 20 },
    { emoji: "😤", delay: 80 },
    { emoji: "😩", delay: 130 },
    { emoji: "⏰", delay: 160 },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isVertical ? "flex-start" : "center",
        padding: isVertical ? "90px 0 60px 0" : "30px 60px",
        gap: isVertical ? 22 : 14,
      }}
    >
      {/* Glow vermelho de fundo */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(239,68,68,0.18), transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* HEADLINE */}
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
        Loja SEM IA
      </div>

      {/* Relogio acelerado */}
      <AcceleratedClock isVertical={isVertical} />

      {/* WhatsApp Mockup + coluna de emojis cansados ao lado */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: isVertical ? 24 : 32,
          width: "100%",
          opacity: mockupOpacity,
          transform: `translateX(${mockupX}px)`,
          marginTop: isVertical ? 6 : 6,
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

        {/* Coluna de emojis acumulando */}
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

      {/* Footer — "13h depois" + "Cliente ja comprou..." */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 12 : 8,
          marginTop: isVertical ? 14 : 10,
          width: "100%",
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 60 : 42,
            fontWeight: 800,
            color: THEME.red,
            letterSpacing: "-0.02em",
            opacity: interpolate(footer1, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(footer1, [0, 1], [30, 0])}px)`,
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          13h depois...
        </div>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 36 : 26,
            fontWeight: 600,
            color: THEME.textMuted,
            opacity: interpolate(footer2, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(footer2, [0, 1], [30, 0])}px)`,
          }}
        >
          Cliente ja comprou no concorrente
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 3 — 9-11s (frames 270-330) — Transicao com flash verde
// =========================================================
const SceneTransicao: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const darkOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const flashOpacity = interpolate(
    frame,
    [15, 22, 35],
    [0, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const headlineSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const headlineScale = interpolate(headlineSpring, [0, 1], [0.6, 1]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "#000",
          opacity: darkOpacity,
        }}
      />

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
          E com{" "}
          <span style={{ color: THEME.verde }}>OTIMIZE Systems</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 4 — 11-21s (frames 330-630) — Com OTIMIZE (WhatsApp centro)
// =========================================================
const SceneComOtimize: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const messages: WhatsAppMessage[] = [
    { from: 8, side: "in", text: "Tem M dessa peca? 19:00:00" },
    {
      from: 28,
      side: "out",
      imageUrl: "linear-gradient(135deg, #ff6b9d, #c44569)",
    },
    {
      from: 50,
      side: "out",
      text: "Sim! Temos M, P e G. R$ 89,90 ou 3x sem juros",
    },
    {
      from: 78,
      side: "out",
      text: "Quer reservar? Posso te mandar pix agora",
    },
    { from: 130, side: "in", text: "Quero!" },
  ];

  const headlineSpring = spring({
    frame: frame - 155,
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

  const successGlow = interpolate(
    frame,
    [150, 180, 300],
    [0, 0.35, 0.25],
    { extrapolateRight: "clamp" }
  );

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
            fontSize: isVertical ? 92 : 64,
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
            fontSize: isVertical ? 70 : 50,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Cliente <span style={{ color: THEME.verde }}>fechou</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 5 — 21-26s (frames 630-780) — Lista vertical sequencial (FIX bug visual)
// =========================================================
const FeatureRow: React.FC<{
  text: string;
  isVertical: boolean;
}> = ({ text, isVertical }) => {
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
        ✓
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: isVertical ? 44 : 32,
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
  const { height, width } = useVideoConfig();
  const isVertical = height > width;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);

  // Items conforme spec: Atende 24h, Manda foto e video, Fecha venda no Pix, Nunca dorme
  const features = [
    "Atende 24h",
    "Manda foto e video",
    "Fecha venda no Pix",
    "Nunca dorme",
  ];

  // Cada item entra com offset crescente via Sequence aninhada
  // Cena dura 150 frames. Titulo come ~22 frames, cada feature aparece a cada 22 frames
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
          fontSize: isVertical ? 86 : 60,
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
// PRICE BADGE ANCORADO — De R$ 997 -> Por R$ 597 com badge PROMOCAO pulsante
// =========================================================
const PriceBadgeAnchored: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
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

  // De R$997 entra primeiro
  const fromSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 16, stiffness: 200 },
  });
  const fromOpacity = interpolate(fromSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fromY = interpolate(fromSpring, [0, 1], [-20, 0]);

  // Por R$597 entra depois com punch
  const toSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const toScale = interpolate(toSpring, [0, 1], [0.5, 1]);
  const toOpacity = interpolate(toSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Badge PROMOCAO pulsante
  const promoPulse = 1 + Math.sin(frame / 5) * 0.06;
  const promoSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 14, stiffness: 200 },
  });
  const promoOpacity = interpolate(promoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle + CTA
  const subSpring = spring({
    frame: frame - 44,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12 * scale,
        transform: `scale(${s})`,
        opacity,
      }}
    >
      {/* Badge PROMOCAO pulsante */}
      <div
        style={{
          background: THEME.red,
          color: "#fff",
          fontFamily: spaceGroteskFamily,
          fontWeight: 800,
          fontSize: 28 * scale,
          padding: `${8 * scale}px ${22 * scale}px`,
          borderRadius: 999,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          boxShadow: `0 8px 32px rgba(239,68,68,0.5)`,
          transform: `scale(${promoPulse})`,
          opacity: promoOpacity,
        }}
      >
        Promocao
      </div>

      {/* De R$ 997 riscado em vermelho */}
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: 52 * scale,
          fontWeight: 700,
          color: THEME.red,
          textDecoration: "line-through",
          textDecorationThickness: 4,
          letterSpacing: "-0.02em",
          opacity: fromOpacity * 0.85,
          transform: `translateY(${fromY}px)`,
          textShadow: `0 2px 12px rgba(239,68,68,0.4)`,
        }}
      >
        De R$ 997
      </div>

      {/* Por R$ 597 grande verde — destaque */}
      <div
        style={{
          background: `linear-gradient(135deg, ${THEME.verde} 0%, ${THEME.verdeDark} 100%)`,
          color: "#000",
          fontFamily: spaceGroteskFamily,
          fontWeight: 800,
          fontSize: 130 * scale,
          padding: `${20 * scale}px ${44 * scale}px`,
          borderRadius: 24 * scale,
          letterSpacing: "-0.03em",
          boxShadow: `0 20px 80px ${THEME.verdeGlow}, 0 0 0 4px rgba(0,255,135,0.25)`,
          lineHeight: 1,
          transform: `scale(${toScale})`,
          opacity: toOpacity,
          display: "flex",
          alignItems: "baseline",
          gap: 14 * scale,
        }}
      >
        <span style={{ fontSize: 50 * scale, fontWeight: 700 }}>Por</span>
        <span>R$ 597</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 30 * scale,
          color: THEME.textMuted,
          fontWeight: 500,
          opacity: subOpacity,
          marginTop: 4 * scale,
          textAlign: "center",
        }}
      >
        por mes, enquanto tiver vagas
      </div>

      {/* CTA */}
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 26 * scale,
          color: THEME.text,
          fontWeight: 600,
          opacity: subOpacity * 0.9,
          textAlign: "center",
          marginTop: 4 * scale,
          padding: "0 20px",
          lineHeight: 1.3,
        }}
      >
        Menos que R$20/dia. Menos que diaria de funcionario.
      </div>
    </div>
  );
};

// =========================================================
// CENA 6 — 26-30s (frames 780-900) — Logo OTIMIZE + Preco ancorado + CTA final
// =========================================================
const SceneFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const ctaSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaSpring, [0, 1], [40, 0]);

  const waSpring = spring({
    frame: frame - 80,
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
        gap: isVertical ? 24 : 16,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Logo OTIMIZE Systems acima do preco — tamanho generoso, spring + glow pulsante */}
      <OtimizeLogoImg size={isVertical ? 280 : 200} pulse />

      {/* Preco ancorado R$997 -> R$597 */}
      <PriceBadgeAnchored scale={isVertical ? 0.9 : 0.65} />

      {/* CTA WhatsApp */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 12 : 8,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          marginTop: isVertical ? 10 : 6,
        }}
      >
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 28 : 22,
            fontWeight: 500,
            color: THEME.textMuted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Fale agora pelo WhatsApp
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 58 : 42,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.02em",
            opacity: waOpacity,
            transform: `scale(${waScale * wapPulse})`,
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
            padding: isVertical ? "14px 36px" : "10px 28px",
            border: `3px solid ${THEME.verde}`,
            borderRadius: 16,
            background: "rgba(0,255,135,0.08)",
          }}
        >
          11 97820-2286
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// COMPOSICAO RAIZ — VideoA (30s @ 30fps = 900 frames)
// =========================================================
export const VideoA: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      <Audio src={staticFile("music/upbeat-corporate.mp3")} volume={0.25} />
      <Audio src={staticFile("voiceover/videoA-narration.mp3")} volume={1.0} startFrom={0} />

      {/* 0-3s — Setup: 19h sua loja fechou */}
      <Sequence from={0} durationInFrames={90} name="01-Setup">
        <SceneSetup />
      </Sequence>

      {/* 3-9s — Loja SEM IA (relogio acelerado + emojis cansados + visto por ultimo) */}
      <Sequence from={90} durationInFrames={180} name="02-SemIA">
        <SceneSemIA />
      </Sequence>

      {/* 9-11s — Transicao */}
      <Sequence from={270} durationInFrames={60} name="03-Transicao">
        <SceneTransicao />
      </Sequence>

      {/* 11-21s — Com OTIMIZE */}
      <Sequence from={330} durationInFrames={300} name="04-ComOtimize">
        <SceneComOtimize />
      </Sequence>

      {/* 21-26s — Card resumo (lista vertical com Sequence aninhada por item) */}
      <Sequence from={630} durationInFrames={150} name="05-Resumo">
        <SceneResumo />
      </Sequence>

      {/* 26-30s — Logo OTIMIZE + Preco ancorado + CTA */}
      <Sequence from={780} durationInFrames={120} name="06-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
