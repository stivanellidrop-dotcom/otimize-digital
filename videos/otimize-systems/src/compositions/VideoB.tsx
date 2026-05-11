import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { Background } from "../components/Background";
import { THEME } from "../theme";
import { interFamily, spaceGroteskFamily } from "../fonts";

/* =========================================================================
   VideoB — "Dados / Impacto financeiro" - V2 Igor
   45s @ 30fps = 1350 frames
   - 0-90     : Stat 70%
   - 90-450   : 3 dores (4s cada = 120 frames)
   - 450-540  : Transicao "A solucao" (com logo real grande + glow)
   - 540-900  : 3 features (4s cada = 120 frames)
   - 900-1170 : Comparativo lado a lado
   - 1170-1350: CTA final (logo real + preco ancorado R$997 -> R$597 + contato)
   ========================================================================= */

// Flags de áudio: deixar música opcional caso o asset não esteja presente.
// O voiceover já existe em public/voiceover/, então rendemos por padrão.
const MUSIC_ENABLED = true;
const VOICEOVER_ENABLED = true;

/* ---------------------------- Bloco 1: Stat 70% --------------------------- */

const StatBlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const numberSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const numberScale = interpolate(numberSpring, [0, 1], [0.5, 1]);
  const numberOpacity = interpolate(numberSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 7) * 0.015;

  const subOpacity = interpolate(frame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subTranslateY = interpolate(frame, [18, 32], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sourceOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = 0.4 + Math.sin(frame / 10) * 0.15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? 80 : 60,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 32 : 24,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isVertical ? 600 : 500,
            height: isVertical ? 600 : 500,
            background: `radial-gradient(circle, rgba(0,255,135,${glowIntensity}) 0%, transparent 70%)`,
            opacity: numberOpacity,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontWeight: 800,
            fontSize: isVertical ? 480 : 380,
            color: THEME.verde,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            transform: `scale(${numberScale * pulse})`,
            opacity: numberOpacity,
            textShadow: `0 0 80px ${THEME.verdeGlow}, 0 0 40px rgba(0,255,135,0.4)`,
            position: "relative",
            zIndex: 2,
          }}
        >
          70%
        </div>

        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontWeight: 700,
            fontSize: isVertical ? 56 : 46,
            color: THEME.text,
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: isVertical ? 900 : 800,
            opacity: subOpacity,
            transform: `translateY(${subTranslateY}px)`,
            padding: "0 40px",
            position: "relative",
            zIndex: 2,
          }}
        >
          dos consumidores esperam resposta em{" "}
          <span style={{ color: THEME.verde }}>menos de 1 hora</span>
        </div>

        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 26 : 22,
            color: THEME.textMuted,
            fontWeight: 500,
            marginTop: 16,
            opacity: sourceOpacity,
            letterSpacing: "0.02em",
          }}
        >
          Fonte: Google Consumer Survey
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------- Bloco 2: Cartao de Dor ---------------------- */

const PainCard: React.FC<{
  emoji: string;
  title: string;
  subtitle: string;
  index: number;
}> = ({ emoji, title, subtitle, index }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entry, [0, 1], [60, 0]);

  // exit nos ultimos 15 frames do bloco (Sequence dura 120)
  const exitOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const emojiSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 10, stiffness: 130 },
  });
  const emojiScale = interpolate(emojiSpring, [0, 1], [0.4, 1]);
  const emojiWobble = Math.sin(frame / 12) * 4;

  const titleOpacity = interpolate(frame, [12, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslateY = interpolate(frame, [12, 26], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? 80 : 60,
        opacity: opacity * exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 36 : 28,
          transform: `translateY(${translateY}px)`,
          maxWidth: isVertical ? 900 : 850,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 14,
            opacity: counterOpacity,
            marginBottom: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === index ? 48 : 18,
                height: 8,
                borderRadius: 4,
                background:
                  i === index ? THEME.red : "rgba(239,68,68,0.25)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            fontSize: isVertical ? 280 : 220,
            lineHeight: 1,
            transform: `scale(${emojiScale}) translateY(${emojiWobble}px)`,
            filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.6))",
          }}
        >
          {emoji}
        </div>

        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontWeight: 800,
            fontSize: isVertical ? 64 : 52,
            color: THEME.text,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            padding: "0 20px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontFamily: interFamily,
            fontWeight: 500,
            fontSize: isVertical ? 36 : 30,
            color: THEME.red,
            textAlign: "center",
            lineHeight: 1.35,
            opacity: subOpacity,
            padding: "0 20px",
            maxWidth: isVertical ? 800 : 700,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------- Bloco 3: Transicao "A Solucao" (com logo real) ------------- */

const TransitionBlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const darken = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flash = interpolate(frame, [15, 22, 35], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const logoSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.4, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulse no glow do logo
  const glowPulse = 0.7 + Math.sin(frame / 8) * 0.3;

  const captionOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionTranslateY = interpolate(frame, [55, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoSize = isVertical ? 480 : 400;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          background: "#000",
          opacity: darken * 0.7,
        }}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at center, ${THEME.verde} 0%, transparent 70%)`,
          opacity: flash * 0.6,
          mixBlendMode: "screen",
        }}
      />

      {/* Glow grande atrás do logo */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(0,255,135,${
            glowPulse * 0.45
          }) 0%, transparent 55%)`,
          opacity: logoOpacity,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 56 : 40,
          zIndex: 2,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            filter: `drop-shadow(0 0 80px ${THEME.verde}) drop-shadow(0 0 40px ${THEME.verdeGlow})`,
          }}
        >
          <Img
            src={staticFile("otimize-logo.svg")}
            style={{ width: logoSize, height: logoSize, display: "block" }}
          />
        </div>

        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontWeight: 800,
            fontSize: isVertical ? 96 : 80,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            opacity: captionOpacity,
            transform: `translateY(${captionTranslateY}px)`,
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
          }}
        >
          A solução.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------- Bloco 4: Feature Card ----------------------- */

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  index: number;
}> = ({ icon, title, subtitle, index }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entry, [0, 1], [60, 0]);

  const exitOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 10, stiffness: 130 },
  });
  const iconScale = interpolate(iconSpring, [0, 1], [0.4, 1]);
  const iconFloat = Math.sin(frame / 14) * 6;

  const titleOpacity = interpolate(frame, [12, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslateY = interpolate(frame, [12, 26], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? 80 : 60,
        opacity: opacity * exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 36 : 28,
          transform: `translateY(${translateY}px)`,
          maxWidth: isVertical ? 900 : 850,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 14,
            opacity: counterOpacity,
            marginBottom: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === index ? 48 : 18,
                height: 8,
                borderRadius: 4,
                background:
                  i === index ? THEME.verde : "rgba(0,255,135,0.25)",
                boxShadow:
                  i === index ? `0 0 16px ${THEME.verdeGlow}` : "none",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: isVertical ? 360 : 300,
              height: isVertical ? 360 : 300,
              background: `radial-gradient(circle, ${THEME.verdeGlow} 0%, transparent 70%)`,
              filter: "blur(30px)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              fontSize: isVertical ? 280 : 220,
              lineHeight: 1,
              transform: `scale(${iconScale}) translateY(${iconFloat}px)`,
              filter: "drop-shadow(0 12px 40px rgba(0,255,135,0.4))",
              position: "relative",
            }}
          >
            {icon}
          </div>
        </div>

        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontWeight: 800,
            fontSize: isVertical ? 64 : 52,
            color: THEME.text,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            padding: "0 20px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontFamily: interFamily,
            fontWeight: 500,
            fontSize: isVertical ? 36 : 30,
            color: THEME.verde,
            textAlign: "center",
            lineHeight: 1.35,
            opacity: subOpacity,
            padding: "0 20px",
            maxWidth: isVertical ? 800 : 700,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------- Bloco 5: Comparativo ------------------------ */

const CompareBlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslateY = interpolate(frame, [0, 18], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const redSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const redOpacity = interpolate(redSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const redTranslateX = interpolate(redSpring, [0, 1], [-80, 0]);

  const greenSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const greenOpacity = interpolate(greenSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const greenTranslateX = interpolate(greenSpring, [0, 1], [80, 0]);

  const vsSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 8, stiffness: 200 },
  });
  const vsScale = interpolate(vsSpring, [0, 1], [0, 1]);
  const vsOpacity = interpolate(vsSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const humanItems = [
    "R$ 2.000+/mês",
    "8h por dia",
    "Fica doente",
    "Tira férias",
    "Esquece, falha",
  ];
  const otimizeItems = [
    "R$ 597/mês",
    "24h por dia",
    "Nunca para",
    "Sempre pronto",
    "Aprende e melhora",
  ];

  const renderList = (
    items: string[],
    color: string,
    delayBase: number,
    symbol: string
  ) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {items.map((item, i) => {
        const itemOpacity = interpolate(
          frame,
          [delayBase + i * 8, delayBase + i * 8 + 14],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const itemTranslateX = interpolate(
          frame,
          [delayBase + i * 8, delayBase + i * 8 + 14],
          [-20, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: itemOpacity,
              transform: `translateX(${itemTranslateX}px)`,
              fontFamily: interFamily,
              fontSize: isVertical ? 32 : 26,
              fontWeight: 600,
              color: THEME.text,
              lineHeight: 1.2,
            }}
          >
            <span
              style={{
                color,
                fontSize: isVertical ? 28 : 24,
                fontWeight: 800,
                minWidth: 24,
                textAlign: "center",
              }}
            >
              {symbol}
            </span>
            {item}
          </div>
        );
      })}
    </div>
  );

  const cardBaseStyle: React.CSSProperties = {
    flex: 1,
    padding: isVertical ? 36 : 30,
    borderRadius: 28,
    display: "flex",
    flexDirection: "column",
    gap: isVertical ? 24 : 20,
    minHeight: isVertical ? 680 : 600,
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? "60px 50px" : "40px 50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isVertical ? 36 : 32,
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontWeight: 800,
            fontSize: isVertical ? 56 : 46,
            color: THEME.text,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            lineHeight: 1.1,
          }}
        >
          Compara aí.
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            gap: isVertical ? 28 : 36,
            width: "100%",
            maxWidth: isVertical ? 960 : 1700,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              ...cardBaseStyle,
              background: `linear-gradient(180deg, rgba(239,68,68,0.18) 0%, rgba(31,41,55,0.6) 100%)`,
              border: `2px solid rgba(239,68,68,0.5)`,
              opacity: redOpacity,
              transform: `translateX(${redTranslateX}px)`,
              boxShadow: "0 20px 60px rgba(239,68,68,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: spaceGroteskFamily,
                fontWeight: 800,
                fontSize: isVertical ? 38 : 32,
                color: THEME.red,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                paddingBottom: 14,
                borderBottom: "1px solid rgba(239,68,68,0.3)",
              }}
            >
              Funcionário humano
            </div>
            {renderList(humanItems, THEME.red, 22, "X")}
          </div>

          <div
            style={{
              ...cardBaseStyle,
              background: `linear-gradient(180deg, rgba(0,255,135,0.18) 0%, rgba(31,41,55,0.6) 100%)`,
              border: `2px solid rgba(0,255,135,0.6)`,
              opacity: greenOpacity,
              transform: `translateX(${greenTranslateX}px)`,
              boxShadow: `0 20px 60px ${THEME.verdeGlow}`,
            }}
          >
            <div
              style={{
                fontFamily: spaceGroteskFamily,
                fontWeight: 800,
                fontSize: isVertical ? 38 : 32,
                color: THEME.verde,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                paddingBottom: 14,
                borderBottom: "1px solid rgba(0,255,135,0.4)",
              }}
            >
              OTIMIZE Systems
            </div>
            {renderList(otimizeItems, THEME.verde, 36, "+")}
          </div>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${vsScale})`,
              opacity: vsOpacity,
              fontFamily: spaceGroteskFamily,
              fontWeight: 800,
              fontSize: isVertical ? 44 : 56,
              color: THEME.text,
              background: THEME.bg,
              borderRadius: "50%",
              width: isVertical ? 88 : 110,
              height: isVertical ? 88 : 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `3px solid ${THEME.verde}`,
              boxShadow: `0 0 40px ${THEME.verdeGlow}`,
              zIndex: 5,
              letterSpacing: "-0.04em",
            }}
          >
            VS
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------- Bloco 6: CTA Final (logo real + ancoragem) -------------------------- */

const FinalCTABlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoTranslateY = interpolate(logoSpring, [0, 1], [-30, 0]);

  // Pricing badge entra logo após o logo
  const priceSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const priceOpacity = interpolate(priceSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const priceScale = interpolate(priceSpring, [0, 1], [0.7, 1]);

  // Promoção badge pulsa
  const promoPulse = 1 + Math.sin(frame / 6) * 0.06;
  const promoGlow = 0.6 + Math.sin(frame / 7) * 0.4;

  // Risco animado no preço antigo (linha riscando entra)
  const strikeProgress = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Preço novo entra com bounce após a risca
  const newPriceSpring = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const newPriceOpacity = interpolate(newPriceSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const newPriceScale = interpolate(newPriceSpring, [0, 1], [0.5, 1]);

  // Pulse sutil no preço novo
  const newPricePulse = 1 + Math.sin(frame / 8) * 0.02;

  const contactOpacity = interpolate(frame, [110, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contactTranslateY = interpolate(frame, [110, 135], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoSize = isVertical ? 260 : 220;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? 60 : 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isVertical ? 28 : 22,
        }}
      >
        {/* Logo real */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoTranslateY}px)`,
            filter: `drop-shadow(0 0 30px ${THEME.verdeGlow})`,
          }}
        >
          <Img
            src={staticFile("otimize-logo.svg")}
            style={{ width: logoSize, height: logoSize, display: "block" }}
          />
        </div>

        {/* Badge PROMOÇÃO pulsante */}
        <div
          style={{
            opacity: priceOpacity,
            transform: `scale(${priceScale * promoPulse})`,
            background: `linear-gradient(135deg, ${THEME.red} 0%, #b91c1c 100%)`,
            color: "#fff",
            fontFamily: spaceGroteskFamily,
            fontWeight: 900,
            fontSize: isVertical ? 30 : 26,
            padding: isVertical ? "10px 28px" : "8px 24px",
            borderRadius: 100,
            letterSpacing: "0.08em",
            boxShadow: `0 0 ${30 * promoGlow}px rgba(239,68,68,${
              0.5 + promoGlow * 0.3
            }), 0 8px 24px rgba(0,0,0,0.4)`,
            textTransform: "uppercase",
          }}
        >
          Promoção
        </div>

        {/* Bloco de preço com ancoragem */}
        <div
          style={{
            opacity: priceOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isVertical ? 14 : 12,
          }}
        >
          {/* Preço antigo riscado */}
          <div
            style={{
              position: "relative",
              fontFamily: spaceGroteskFamily,
              fontWeight: 700,
              fontSize: isVertical ? 56 : 46,
              color: THEME.textMuted,
              letterSpacing: "-0.02em",
              padding: "0 8px",
            }}
          >
            <span style={{ opacity: 0.85 }}>De R$ 997</span>
            {/* Linha riscando animada */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                height: 6,
                background: THEME.red,
                width: `${strikeProgress * 100}%`,
                transform: "translateY(-50%) rotate(-3deg)",
                boxShadow: `0 0 12px ${THEME.red}`,
                borderRadius: 4,
              }}
            />
          </div>

          {/* Preço novo grande verde */}
          <div
            style={{
              opacity: newPriceOpacity,
              transform: `scale(${newPriceScale * newPricePulse})`,
              background: `linear-gradient(135deg, ${THEME.verde} 0%, ${THEME.verdeDark} 100%)`,
              color: "#000",
              fontFamily: spaceGroteskFamily,
              fontWeight: 900,
              fontSize: isVertical ? 130 : 110,
              padding: isVertical ? "20px 44px" : "16px 40px",
              borderRadius: 24,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              boxShadow: `0 20px 80px ${THEME.verdeGlow}, 0 0 0 4px rgba(0,255,135,0.25)`,
            }}
          >
            Por R$ 597
          </div>

          <div
            style={{
              opacity: newPriceOpacity,
              fontFamily: interFamily,
              fontSize: isVertical ? 28 : 24,
              color: THEME.text,
              fontWeight: 600,
              marginTop: 4,
              textAlign: "center",
              maxWidth: isVertical ? 720 : 640,
            }}
          >
            por mês,{" "}
            <span style={{ color: THEME.verde, fontWeight: 700 }}>
              enquanto tiver vagas
            </span>
          </div>
        </div>

        {/* Contato */}
        <div
          style={{
            opacity: contactOpacity,
            transform: `translateY(${contactTranslateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: isVertical ? 12 : 6,
          }}
        >
          <div
            style={{
              fontFamily: interFamily,
              fontSize: isVertical ? 28 : 22,
              color: THEME.text,
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            WhatsApp (11) 97820-2286
          </div>
          <div
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isVertical ? 30 : 24,
              color: THEME.verde,
              fontWeight: 700,
              letterSpacing: "-0.01em",
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

/* ============================== VideoB principal ========================== */

export const VideoB: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* Trilha sonora cinematográfica (volume baixo) - opcional via flag */}
      {MUSIC_ENABLED && (
        <Audio src={staticFile("music/cinematic-tech.mp3")} volume={0.25} />
      )}

      {/* Narração principal */}
      {VOICEOVER_ENABLED && (
        <Audio
          src={staticFile("voiceover/videoB-narration.mp3")}
          volume={1.0}
        />
      )}

      {/* 0-90 — Stat 70% */}
      <Sequence from={0} durationInFrames={90}>
        <StatBlock />
      </Sequence>

      {/* 90-450 — 3 dores (120 frames cada) */}
      <Sequence from={90} durationInFrames={120}>
        <PainCard
          emoji="😴"
          title="Mensagens sem resposta à noite"
          subtitle="Você perde para quem responde primeiro"
          index={0}
        />
      </Sequence>
      <Sequence from={210} durationInFrames={120}>
        <PainCard
          emoji="🔁"
          title="Perguntas repetidas todo dia"
          subtitle="Qual o preço, qual o tamanho, tem M, aceita pix... horas perdidas"
          index={1}
        />
      </Sequence>
      <Sequence from={330} durationInFrames={120}>
        <PainCard
          emoji="💸"
          title="Funcionário custa R$ 2.000+/mês"
          subtitle="Falta, esquece, falha. E só trabalha 8h/dia"
          index={2}
        />
      </Sequence>

      {/* 450-540 — Transição "A solução" (logo real grande + glow) */}
      <Sequence from={450} durationInFrames={90}>
        <TransitionBlock />
      </Sequence>

      {/* 540-900 — 3 features (120 frames cada) */}
      <Sequence from={540} durationInFrames={120}>
        <FeatureCard
          icon="⚡"
          title="Responde em 15 segundos"
          subtitle="24h por dia, 7 dias por semana"
          index={0}
        />
      </Sequence>
      <Sequence from={660} durationInFrames={120}>
        <FeatureCard
          icon="📸"
          title="Manda foto, vídeo, catálogo"
          subtitle="Como vendedor de verdade"
          index={1}
        />
      </Sequence>
      <Sequence from={780} durationInFrames={120}>
        <FeatureCard
          icon="🎯"
          title="Follow-up automático"
          subtitle="Não deixa lead esfriar"
          index={2}
        />
      </Sequence>

      {/* 900-1170 — Comparativo */}
      <Sequence from={900} durationInFrames={270}>
        <CompareBlock />
      </Sequence>

      {/* 1170-1350 — CTA Final com logo real + ancoragem R$997 -> R$597 */}
      <Sequence from={1170} durationInFrames={180}>
        <FinalCTABlock />
      </Sequence>
    </AbsoluteFill>
  );
};
