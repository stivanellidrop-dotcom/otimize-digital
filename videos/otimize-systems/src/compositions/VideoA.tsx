import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background, OtimizeLogo } from "../components/Background";
import { Caption } from "../components/Caption";
import { PriceBadge } from "../components/PriceBadge";
import { WhatsAppMockup, WhatsAppMessage } from "../components/WhatsAppMockup";
import { THEME } from "../theme";
import { interFamily, spaceGroteskFamily } from "../fonts";

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

  // Piscar do ":" do relogio digital
  const colonOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.25;

  // Pulse sutil
  const pulse = 1 + Math.sin(frame / 10) * 0.015;

  // Glow vermelho que sobe (loja fechou)
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
// CENA 2 — 3-9s (frames 90-270) — Loja SEM IA (WhatsApp esquerda)
// =========================================================
const SceneSemIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Mensagens da loja SEM IA — cliente manda 19:00, loja responde 09:14 do dia seguinte
  const messages: WhatsAppMessage[] = [
    { from: 6, side: "in", text: "Tem M dessa peca? 19:00" },
    { from: 60, side: "out", text: "Bom dia, ainda temos sim! 09:14" },
  ];

  // Animacao do headline
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [-40, 0]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Mockup entry (frame inicial)
  const mockupSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const mockupX = interpolate(mockupSpring, [0, 1], [-200, 0]);
  const mockupOpacity = interpolate(mockupSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Footer captions entrando depois
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

  const mockupScale = isVertical ? 1.3 : 0.9;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isVertical ? "center" : "flex-start",
        justifyContent: isVertical ? "flex-start" : "center",
        padding: isVertical ? "120px 0 80px 0" : "60px 80px",
        gap: isVertical ? 40 : 20,
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
          fontSize: isVertical ? 96 : 72,
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

      {/* WhatsApp Mockup */}
      <div
        style={{
          display: "flex",
          justifyContent: isVertical ? "center" : "flex-start",
          alignItems: "center",
          width: "100%",
          opacity: mockupOpacity,
          transform: `translateX(${mockupX}px)`,
          marginLeft: isVertical ? 0 : 40,
        }}
      >
        <WhatsAppMockup
          contactName="Cliente"
          contactStatus="visto por ultimo hoje as 09:14"
          avatarLetter="C"
          avatarColor={THEME.red}
          messages={messages}
          scale={mockupScale}
        />
      </div>

      {/* Footer — "13h depois" + "Cliente ja comprou..." */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 18 : 10,
          marginTop: isVertical ? 30 : 20,
          width: "100%",
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 70 : 50,
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
            fontSize: isVertical ? 42 : 32,
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

  // Escurecimento 0-15, flash verde 15-30, headline 30-60
  const darkOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Flash verde — pico em ~22
  const flashOpacity = interpolate(
    frame,
    [15, 22, 35],
    [0, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Headline entry
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
      {/* Camada de escurecimento */}
      <AbsoluteFill
        style={{
          background: "#000",
          opacity: darkOpacity,
        }}
      />

      {/* Flash verde */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${THEME.verde} 0%, transparent 70%)`,
          opacity: flashOpacity,
          mixBlendMode: "screen",
        }}
      />

      {/* Headline final da transicao */}
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

  // Sequence das mensagens em frames locais (componente roda em 300 frames)
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

  // Headline com timer "15 segundos" — entra apos cliente responder
  const headlineSpring = spring({
    frame: frame - 155,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headlineScale = interpolate(headlineSpring, [0, 1], [0.7, 1]);

  // Mockup entry
  const mockupSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const mockupY = interpolate(mockupSpring, [0, 1], [60, 0]);
  const mockupOpacity = interpolate(mockupSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow pulsando verde apos a venda
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

      {/* Mockup WhatsApp central */}
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

      {/* Headline embaixo — "15 segundos. Cliente fechou." */}
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
// CENA 5 — 21-26s (frames 630-780) — Card resumo 4 itens
// =========================================================
const FeatureRow: React.FC<{
  text: string;
  index: number;
  isVertical: boolean;
}> = ({ text, index, isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 18;
  const entry = spring({
    frame: frame - delay,
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
        gap: isVertical ? 32 : 24,
        opacity,
        transform: `translateX(${translateX}px)`,
        padding: isVertical ? "20px 40px" : "16px 32px",
        background: "rgba(0,255,135,0.06)",
        borderLeft: `6px solid ${THEME.verde}`,
        borderRadius: 12,
        width: "100%",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: isVertical ? 56 : 44,
          height: isVertical ? 56 : 44,
          minWidth: isVertical ? 56 : 44,
          borderRadius: "50%",
          background: THEME.verde,
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: spaceGroteskFamily,
          fontWeight: 800,
          fontSize: isVertical ? 30 : 22,
        }}
      >
        +
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: isVertical ? 48 : 34,
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
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

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
    "Atende 24h por dia",
    "Manda foto, preco e pagamento",
    "Nunca dorme, nunca falta",
    "Sempre pronto pra vender",
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "120px 80px" : "60px 120px",
        gap: isVertical ? 50 : 30,
      }}
    >
      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 92 : 64,
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
          gap: isVertical ? 20 : 14,
          width: "100%",
          maxWidth: isVertical ? 900 : 800,
        }}
      >
        {features.map((text, i) => (
          <Sequence key={i} from={0} durationInFrames={150}>
            <FeatureRow text={text} index={i} isVertical={isVertical} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 6 — 26-30s (frames 780-900) — Preco + CTA final
// =========================================================
const SceneFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  // CTA entry
  const ctaSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaSpring, [0, 1], [40, 0]);

  // Logo entry
  const logoSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 16, stiffness: 160 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // WhatsApp CTA entry
  const waSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const waOpacity = interpolate(waSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const waScale = interpolate(waSpring, [0, 1], [0.8, 1]);

  // Pulse no botao final
  const wapPulse = 1 + Math.sin(frame / 6) * 0.025;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "100px 60px" : "60px 80px",
        gap: isVertical ? 60 : 40,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <PriceBadge
        price="R$ 597"
        subtitle="por mes"
        cta="Menos que diaria de funcionario"
        scale={isVertical ? 1 : 0.78}
      />

      <div
        style={{
          opacity: logoOpacity,
        }}
      >
        <OtimizeLogo size={isVertical ? 80 : 64} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 16 : 10,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 32 : 24,
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
            fontSize: isVertical ? 68 : 52,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.02em",
            opacity: waOpacity,
            transform: `scale(${waScale * wapPulse})`,
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
            padding: isVertical ? "16px 40px" : "12px 32px",
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
// COMPOSICAO RAIZ — VideoA
// =========================================================
export const VideoA: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* 0-3s — Setup: 19h sua loja fechou */}
      <Sequence from={0} durationInFrames={90} name="01-Setup">
        <SceneSetup />
      </Sequence>

      {/* 3-9s — Loja SEM IA */}
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

      {/* 21-26s — Card resumo */}
      <Sequence from={630} durationInFrames={150} name="05-Resumo">
        <SceneResumo />
      </Sequence>

      {/* 26-30s — Preco final + CTA */}
      <Sequence from={780} durationInFrames={120} name="06-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
