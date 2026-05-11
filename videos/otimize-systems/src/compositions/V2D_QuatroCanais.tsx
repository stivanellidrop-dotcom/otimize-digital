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
// TESTE GRATIS BADGE — inline conforme spec
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
        TESTE<br />GRÁTIS<br />7 DIAS
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

// =========================================================
// LOGO OTIMIZE
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
// DADOS DOS CANAIS
// =========================================================
type Channel = {
  name: string;
  short: string;
  letter: string;
  color: string;
  glow: string;
};

const CHANNELS: Channel[] = [
  { name: "Mercado Livre", short: "ML", letter: "M", color: "#FFE600", glow: "rgba(255,230,0,0.4)" },
  { name: "Shopee", short: "SH", letter: "S", color: "#EE4D2D", glow: "rgba(238,77,45,0.4)" },
  { name: "Instagram", short: "IG", letter: "I", color: "#E1306C", glow: "rgba(225,48,108,0.4)" },
  { name: "WhatsApp", short: "WA", letter: "W", color: "#25D366", glow: "rgba(37,211,102,0.4)" },
];

// =========================================================
// CANAL CIRCLE — circulo grande com letra do canal
// =========================================================
const ChannelCircle: React.FC<{
  channel: Channel;
  size: number;
  startFrame: number;
  badge?: string;
}> = ({ channel, size, startFrame, badge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const entry = spring({
    frame: local,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const scale = interpolate(entry, [0, 1], [0, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(local / 10) * 0.04;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.12,
        opacity,
        transform: `scale(${scale * pulse})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -size * 0.12,
            background: `radial-gradient(circle, ${channel.glow} 0%, transparent 65%)`,
            filter: "blur(16px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: channel.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: spaceGroteskFamily,
            fontSize: size * 0.5,
            fontWeight: 800,
            color: "#000",
            boxShadow: `0 12px 40px ${channel.glow}, inset 0 -8px 24px rgba(0,0,0,0.2)`,
          }}
        >
          {channel.letter}
        </div>
        {badge && (
          <div
            style={{
              position: "absolute",
              top: -size * 0.08,
              right: -size * 0.08,
              width: size * 0.36,
              height: size * 0.36,
              borderRadius: "50%",
              background: THEME.red,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: spaceGroteskFamily,
              fontWeight: 800,
              fontSize: size * 0.2,
              boxShadow: `0 4px 16px rgba(239,68,68,0.6)`,
              border: `${size * 0.04}px solid ${THEME.bg}`,
            }}
          >
            {badge}
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: size * 0.18,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.01em",
          textAlign: "center",
        }}
      >
        {channel.name}
      </div>
    </div>
  );
};

// =========================================================
// CENA 1 — 0-3s — Hook "Voce vende em quantos lugares?"
// =========================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const qSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const qScale = interpolate(qSpring, [0, 1], [0.5, 1]);
  const qOpacity = interpolate(qSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 10) * 0.02;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 40 : 24,
        padding: isVertical ? "120px 60px" : "60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124,58,237,0.2), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 96 : 70,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: 950,
        }}
      >
        Você vende em
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 200 : 140,
          fontWeight: 800,
          color: THEME.verde,
          letterSpacing: "-0.04em",
          textAlign: "center",
          opacity: qOpacity,
          transform: `scale(${qScale * pulse})`,
          textShadow: `0 0 60px ${THEME.verdeGlow}, 0 0 120px rgba(0,255,135,0.3)`,
          lineHeight: 1,
        }}
      >
        quantos lugares?
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-13s — 4 icones aparecendo
// =========================================================
const Scene4Canais: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);

  const capSpring = spring({
    frame: frame - 200,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capScale = interpolate(capSpring, [0, 1], [0.7, 1]);

  const pulse = 1 + Math.sin(frame / 10) * 0.02;

  const circleSize = isVertical ? 280 : 200;
  const channelStart = 20;
  const channelStep = 30;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 60 : 36,
        padding: isVertical ? "100px 60px" : "60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.12), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 56 : 40,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.02em",
          textAlign: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          lineHeight: 1.15,
        }}
      >
        Seus canais hoje
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, 1fr)`,
          gap: isVertical ? 80 : 50,
          justifyItems: "center",
          alignItems: "center",
          maxWidth: isVertical ? 900 : 700,
        }}
      >
        {CHANNELS.map((channel, i) => (
          <ChannelCircle
            key={channel.name}
            channel={channel}
            size={circleSize}
            startFrame={channelStart + i * channelStep}
            badge="!"
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: capOpacity,
          transform: `scale(${capScale * pulse})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 60 : 42,
            fontWeight: 800,
            color: THEME.red,
            letterSpacing: "-0.03em",
            textShadow: `0 0 40px rgba(239,68,68,0.5)`,
            lineHeight: 1.1,
          }}
        >
          4 caixas pra olhar
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 48 : 34,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          4× mais trabalho.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 3 — 13-18s — "E se tudo respondesse SOZINHO em 1 so lugar?"
// =========================================================
const ScenePergunta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const darkOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const flashOpacity = interpolate(frame, [16, 26, 50], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  const linha1Spring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const linha1Opacity = interpolate(linha1Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const linha1Y = interpolate(linha1Spring, [0, 1], [40, 0]);

  const sozinhoSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const sozinhoScale = interpolate(sozinhoSpring, [0, 1], [0.5, 1]);
  const sozinhoOpacity = interpolate(sozinhoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const linha3Spring = spring({
    frame: frame - 78,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const linha3Opacity = interpolate(linha3Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const linha3Y = interpolate(linha3Spring, [0, 1], [40, 0]);

  const pulse = 1 + Math.sin(frame / 9) * 0.025;

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          gap: isVertical ? 24 : 14,
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 76 : 54,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            textAlign: "center",
            opacity: linha1Opacity,
            transform: `translateY(${linha1Y}px)`,
            lineHeight: 1.15,
          }}
        >
          E se tudo respondesse
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 170 : 120,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.04em",
            textAlign: "center",
            opacity: sozinhoOpacity,
            transform: `scale(${sozinhoScale * pulse})`,
            textShadow: `0 0 60px ${THEME.verdeGlow}, 0 0 120px rgba(0,255,135,0.3)`,
            lineHeight: 1,
          }}
        >
          SOZINHO
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 76 : 54,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            textAlign: "center",
            opacity: linha3Opacity,
            transform: `translateY(${linha3Y}px)`,
            lineHeight: 1.15,
          }}
        >
          em <span style={{ color: THEME.verde }}>1 só lugar</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 4 — 18-30s — Hub central conectando os 4 canais
// =========================================================
const SceneHub: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const hubSize = isVertical ? 320 : 220;
  const circleSize = isVertical ? 200 : 140;
  const radius = isVertical ? 420 : 280;

  const positions = [
    { x: -radius, y: -radius * 0.9 },
    { x: radius, y: -radius * 0.9 },
    { x: -radius, y: radius * 0.9 },
    { x: radius, y: radius * 0.9 },
  ];

  const hubSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const hubScale = interpolate(hubSpring, [0, 1], [0, 1]);
  const hubOpacity = interpolate(hubSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const hubPulse = 1 + Math.sin(frame / 8) * 0.03;

  const capSpring = spring({
    frame: frame - 230,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capScale = interpolate(capSpring, [0, 1], [0.7, 1]);
  const captionPulse = 1 + Math.sin(frame / 10) * 0.02;

  // Particulas fluindo nas linhas
  const flowSpeed = (frame / 4) % 100;

  const containerSize = radius * 2 + circleSize;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "100px 40px" : "40px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: containerSize,
          height: containerSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SVG linhas conectando hub aos canais */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {positions.map((pos, i) => {
            const cx = containerSize / 2;
            const cy = containerSize / 2;
            const x2 = cx + pos.x;
            const y2 = cy + pos.y;

            const lineStart = 30 + i * 18;
            const lineEnd = lineStart + 40;
            const lineProgress = interpolate(
              frame,
              [lineStart, lineEnd],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const px = cx + (x2 - cx) * lineProgress;
            const py = cy + (y2 - cy) * lineProgress;

            return (
              <g key={i}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={px}
                  y2={py}
                  stroke={THEME.verde}
                  strokeWidth={4}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 8px ${THEME.verde})`,
                  }}
                />
                {lineProgress >= 1 &&
                  [0, 33, 66].map((offset, j) => {
                    const t = ((flowSpeed + offset) % 100) / 100;
                    const dotX = cx + (x2 - cx) * t;
                    const dotY = cy + (y2 - cy) * t;
                    return (
                      <circle
                        key={j}
                        cx={dotX}
                        cy={dotY}
                        r={6}
                        fill={THEME.verde}
                        style={{
                          filter: `drop-shadow(0 0 8px ${THEME.verde})`,
                        }}
                      />
                    );
                  })}
              </g>
            );
          })}
        </svg>

        {/* Hub central com logo OTIMIZE */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${hubScale * hubPulse})`,
            opacity: hubOpacity,
            width: hubSize,
            height: hubSize,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${THEME.verde} 0%, ${THEME.verdeDark} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 80px ${THEME.verdeGlow}, 0 0 160px rgba(0,255,135,0.3)`,
            zIndex: 5,
          }}
        >
          <Img
            src={staticFile("otimize-logo.svg")}
            style={{
              width: hubSize * 0.7,
              height: hubSize * 0.7,
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))",
            }}
          />
        </div>

        {/* 4 canais nos cantos */}
        {positions.map((pos, i) => {
          const channel = CHANNELS[i];
          const cx = containerSize / 2;
          const cy = containerSize / 2;

          return (
            <div
              key={channel.name}
              style={{
                position: "absolute",
                top: cy + pos.y - circleSize / 2,
                left: cx + pos.x - circleSize / 2,
                zIndex: 10,
              }}
            >
              <ChannelCircle
                channel={channel}
                size={circleSize}
                startFrame={i * 12}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: capOpacity,
          transform: `scale(${capScale * captionPulse})`,
          textAlign: "center",
          marginTop: isVertical ? 30 : 14,
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 60 : 44,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            textShadow: `0 0 50px ${THEME.verdeGlow}`,
            lineHeight: 1.1,
          }}
        >
          OTIMIZE conecta tudo.
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 50 : 36,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Responde tudo.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CHECK CARD sequencial
// =========================================================
const CheckCard: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const scale = interpolate(entry, [0, 1], [0.6, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entry, [0, 1], [40, 0]);

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
          background: `radial-gradient(ellipse at 50% 50%, rgba(0,255,135,0.2), transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isVertical ? 40 : 28,
          padding: isVertical ? "50px 70px" : "30px 50px",
          background: "rgba(0,255,135,0.1)",
          border: `4px solid ${THEME.verde}`,
          borderRadius: 28,
          boxShadow: `0 20px 80px rgba(0,255,135,0.3)`,
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          maxWidth: isVertical ? 940 : 800,
        }}
      >
        <div
          style={{
            width: isVertical ? 110 : 80,
            height: isVertical ? 110 : 80,
            minWidth: isVertical ? 110 : 80,
            borderRadius: "50%",
            background: THEME.verde,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 70 : 50,
            fontWeight: 800,
            color: "#000",
            boxShadow: `0 0 40px ${THEME.verdeGlow}`,
          }}
        >
          ✓
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 58 : 40,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA FINAL — 35-40s
// =========================================================
const SceneFinal: React.FC = () => {
  const { height, width } = useVideoConfig();
  const isVertical = height > width;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "80px 60px" : "40px 80px",
        gap: isVertical ? 40 : 28,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,0.2), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <OtimizeLogoImg size={isVertical ? 240 : 170} pulse />

      <TesteGratisBadge scale={isVertical ? 1.0 : 0.7} />
    </AbsoluteFill>
  );
};

// =========================================================
// COMPOSICAO RAIZ — V2D_QuatroCanais (40s @ 30fps = 1200 frames)
// =========================================================
export const V2D_QuatroCanais: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* 0-3s — Hook "Voce vende em quantos lugares?" */}
      <Sequence from={0} durationInFrames={90} name="01-Hook">
        <SceneHook />
      </Sequence>

      {/* 3-13s — 4 canais com badge ! (10s = 300 frames) */}
      <Sequence from={90} durationInFrames={300} name="02-4Canais">
        <Scene4Canais />
      </Sequence>

      {/* 13-18s — Pergunta "E se tudo respondesse SOZINHO?" (5s = 150 frames) */}
      <Sequence from={390} durationInFrames={150} name="03-Pergunta">
        <ScenePergunta />
      </Sequence>

      {/* 18-30s — Hub central com OTIMIZE conectando tudo (12s = 360 frames) */}
      <Sequence from={540} durationInFrames={360} name="04-Hub">
        <SceneHub />
      </Sequence>

      {/* 30-35s — 3 cards sequenciais (5s = 150 frames, 50 cada) */}
      <Sequence from={900} durationInFrames={50} name="05-Check1">
        <CheckCard text="1 lugar pra gerenciar" />
      </Sequence>
      <Sequence from={950} durationInFrames={50} name="06-Check2">
        <CheckCard text="Mesma resposta padrão" />
      </Sequence>
      <Sequence from={1000} durationInFrames={50} name="07-Check3">
        <CheckCard text="Você foca em vender" />
      </Sequence>

      {/* 35-40s — Logo + TesteGratisBadge */}
      <Sequence from={1050} durationInFrames={150} name="08-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
