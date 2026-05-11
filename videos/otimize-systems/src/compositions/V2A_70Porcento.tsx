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
import { THEME } from "../theme";
import { interFamily, spaceGroteskFamily } from "../fonts";

// =========================================================
// CTA BADGE — inline conforme spec
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
        TESTE AGORA
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 26 * scale,
          color: "#8892A4",
          fontWeight: 500,
        }}
      >
        (11) 97820-2286
      </div>
    </div>
  );
};

// =========================================================
// LOGO OTIMIZE — usa imagem real (staticFile)
// =========================================================
const OtimizeLogoImg: React.FC<{ size?: number; pulse?: boolean }> = ({
  size = 200,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const scale = interpolate(entry, [0, 1], [0.5, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], { extrapolateRight: "clamp" });

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
// CENA 1 — 0-3s (frames 0-90) — Hook stat 70%
// =========================================================
const SceneHook70: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const statSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const statScale = interpolate(statSpring, [0, 1], [0.4, 1]);
  const statOpacity = interpolate(statSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 9) * 0.025;

  const captionSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 160 },
  });
  const captionOpacity = interpolate(captionSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionY = interpolate(captionSpring, [0, 1], [40, 0]);

  const sourceSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 18, stiffness: 180 },
  });
  const sourceOpacity = interpolate(sourceSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 30 : 20,
        padding: isVertical ? "100px 60px" : "60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.22), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 460 : 320,
          fontWeight: 800,
          color: THEME.verde,
          letterSpacing: "-0.06em",
          lineHeight: 0.9,
          transform: `scale(${statScale * pulse})`,
          opacity: statOpacity,
          textShadow: `0 0 80px rgba(0,255,135,0.6), 0 0 160px rgba(0,255,135,0.3)`,
        }}
      >
        70%
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 56 : 42,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.02em",
          textAlign: "center",
          lineHeight: 1.2,
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
          maxWidth: 900,
          padding: "0 40px",
        }}
      >
        dos clientes esperam resposta em{" "}
        <span style={{ color: THEME.verde }}>menos de 1 hora</span>
      </div>

      <div
        style={{
          fontFamily: interFamily,
          fontSize: isVertical ? 24 : 18,
          color: THEME.textMuted,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: sourceOpacity,
          marginTop: 8,
        }}
      >
        Fonte: Google Consumer Survey
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// PAIN CARD — usado em CENA 2
// =========================================================
const PainCard: React.FC<{
  emoji: string;
  text: string;
  isVertical: boolean;
}> = ({ emoji, text, isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const scale = interpolate(entry, [0, 1], [0.6, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entry, [0, 1], [60, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 40 : 28,
        padding: isVertical ? "60px 80px" : "40px 60px",
        background: "rgba(239,68,68,0.08)",
        border: `3px solid ${THEME.red}`,
        borderRadius: 32,
        boxShadow: "0 20px 80px rgba(239,68,68,0.25)",
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        maxWidth: isVertical ? 900 : 800,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: isVertical ? 220 : 160,
          lineHeight: 1,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
        }}
      >
        {emoji}
      </div>
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 56 : 40,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const ScenePainWrapper: React.FC<{ emoji: string; text: string }> = ({
  emoji,
  text,
}) => {
  const { height, width } = useVideoConfig();
  const isVertical = height > width;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "120px 60px" : "60px 80px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <PainCard emoji={emoji} text={text} isVertical={isVertical} />
    </AbsoluteFill>
  );
};

// =========================================================
// CENA TRANSICAO — 13-16s (frames 390-480) — escurece, flash verde, logo
// =========================================================
const SceneTransicao: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const isVertical = height > width;

  const darkOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const flashOpacity = interpolate(frame, [20, 30, 50], [0, 1, 0], {
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
        <Sequence from={45}>
          <OtimizeLogoImg size={isVertical ? 360 : 260} pulse />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// FEATURE CARD — usado em CENA 4
// =========================================================
const FeatureCard: React.FC<{
  emoji: string;
  text: string;
  isVertical: boolean;
}> = ({ emoji, text, isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const scale = interpolate(entry, [0, 1], [0.6, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entry, [0, 1], [60, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 40 : 28,
        padding: isVertical ? "60px 80px" : "40px 60px",
        background: "rgba(0,255,135,0.08)",
        border: `3px solid ${THEME.verde}`,
        borderRadius: 32,
        boxShadow: "0 20px 80px rgba(0,255,135,0.25)",
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        maxWidth: isVertical ? 900 : 800,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: isVertical ? 220 : 160,
          lineHeight: 1,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
        }}
      >
        {emoji}
      </div>
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 56 : 40,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SceneFeatureWrapper: React.FC<{ emoji: string; text: string }> = ({
  emoji,
  text,
}) => {
  const { height, width } = useVideoConfig();
  const isVertical = height > width;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "120px 60px" : "60px 80px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <FeatureCard emoji={emoji} text={text} isVertical={isVertical} />
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 5 — 30-35s (frames 900-1050) — "Imagina isso atendendo na SUA loja"
// =========================================================
const SceneImaginaIsso: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.6, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 10) * 0.02;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "100px 60px" : "60px 80px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.22), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 130 : 96,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          textAlign: "center",
          transform: `scale(${titleScale * pulse})`,
          opacity: titleOpacity,
          textShadow: `0 0 60px rgba(0,255,135,0.4)`,
          maxWidth: 1000,
        }}
      >
        Imagina isso atendendo na{" "}
        <span
          style={{
            color: THEME.verde,
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
          }}
        >
          SUA
        </span>{" "}
        loja
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 6 — 35-40s (frames 1050-1200) — TesteGratisBadge + Logo + WhatsApp
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
        gap: isVertical ? 36 : 24,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <OtimizeLogoImg size={isVertical ? 220 : 160} pulse />

      <TesteGratisBadge scale={isVertical ? 0.9 : 0.65} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 12 : 8,
          marginTop: isVertical ? 12 : 8,
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
          Fale agora pelo WhatsApp
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 54 : 38,
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
          (11) 97820-2286
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// COMPOSICAO RAIZ — V2A_70Porcento (40s @ 30fps = 1200 frames)
// =========================================================
export const V2A_70Porcento: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* 0-3s — Hook stat 70% */}
      <Sequence from={0} durationInFrames={90} name="01-Hook70">
        <SceneHook70 />
      </Sequence>

      {/* 3-13s — 3 dores em cards (~3.3s cada) */}
      <Sequence from={90} durationInFrames={100} name="02-Pain1">
        <ScenePainWrapper
          emoji="😴"
          text="Sua loja fechou. Cliente espera. Compra com concorrente."
        />
      </Sequence>
      <Sequence from={190} durationInFrames={100} name="03-Pain2">
        <ScenePainWrapper
          emoji="🔁"
          text="Mesma pergunta 50× por dia. Você responde manual."
        />
      </Sequence>
      <Sequence from={290} durationInFrames={100} name="04-Pain3">
        <ScenePainWrapper
          emoji="💸"
          text="Mensagens sem resposta = vendas perdidas. Todo dia."
        />
      </Sequence>

      {/* 13-16s — Transicao com flash verde + logo OTIMIZE */}
      <Sequence from={390} durationInFrames={90} name="05-Transicao">
        <SceneTransicao />
      </Sequence>

      {/* 16-30s — 3 features OTIMIZE (~4.6s cada) */}
      <Sequence from={480} durationInFrames={140} name="06-Feature1">
        <SceneFeatureWrapper
          emoji="⚡"
          text="Responde em 15 segundos. 24 horas por dia."
        />
      </Sequence>
      <Sequence from={620} durationInFrames={140} name="07-Feature2">
        <SceneFeatureWrapper
          emoji="📸"
          text="Manda foto, vídeo, catálogo. Como vendedor real."
        />
      </Sequence>
      <Sequence from={760} durationInFrames={140} name="08-Feature3">
        <SceneFeatureWrapper
          emoji="🎯"
          text="Follow-up automático. Não deixa lead esfriar."
        />
      </Sequence>

      {/* 30-35s — "Imagina isso atendendo na SUA loja" */}
      <Sequence from={900} durationInFrames={150} name="09-ImaginaIsso">
        <SceneImaginaIsso />
      </Sequence>

      {/* 35-40s — TesteGratisBadge + logo + WhatsApp */}
      <Sequence from={1050} durationInFrames={150} name="10-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
