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
// CALENDAR GRID — 365 dias, cada celula com status
// =========================================================
type DayStatus = "available" | "vacation" | "sick" | "holiday" | "weekend";

const buildHumanCalendar = (): DayStatus[] => {
  const days: DayStatus[] = Array(365).fill("available");
  for (let i = 180; i < 210; i++) days[i] = "vacation";
  [42, 95, 220, 280, 333].forEach((d) => (days[d] = "sick"));
  [0, 30, 90, 110, 140, 170, 215, 250, 280, 305, 330, 358].forEach((d) => {
    if (days[d] === "available") days[d] = "holiday";
  });
  for (let i = 6; i < 365; i += 7) {
    if (days[i] === "available") days[i] = "weekend";
  }
  return days;
};

const CalendarGrid: React.FC<{
  days: DayStatus[];
  cellSize: number;
  cols: number;
  revealProgress: number;
  allAvailable?: boolean;
}> = ({ days, cellSize, cols, revealProgress, allAvailable = false }) => {
  const visibleCount = Math.floor(days.length * revealProgress);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: Math.max(2, cellSize * 0.12),
        background: "rgba(255,255,255,0.03)",
        padding: cellSize * 0.6,
        borderRadius: 16,
        border: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      {days.map((status, i) => {
        const isVisible = i < visibleCount;
        let bg = "rgba(255,255,255,0.06)";
        let symbol: string | null = null;

        if (allAvailable) {
          bg = THEME.verde;
          symbol = "✓";
        } else {
          if (status === "available") {
            bg = "rgba(0,255,135,0.18)";
          } else if (status === "vacation") {
            bg = THEME.red;
            symbol = "×";
          } else if (status === "sick") {
            bg = "#FB923C";
            symbol = "×";
          } else if (status === "holiday") {
            bg = "#A855F7";
            symbol = "×";
          } else if (status === "weekend") {
            bg = "#64748B";
            symbol = "×";
          }
        }

        return (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              background: bg,
              borderRadius: cellSize * 0.18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: spaceGroteskFamily,
              fontSize: cellSize * 0.7,
              fontWeight: 800,
              color: allAvailable ? "#000" : "#fff",
              opacity: isVisible ? 1 : 0,
              transform: `scale(${isVisible ? 1 : 0.5})`,
              boxShadow: allAvailable
                ? `0 0 ${cellSize * 0.3}px rgba(0,255,135,0.5)`
                : "none",
              lineHeight: 1,
            }}
          >
            {symbol}
          </div>
        );
      })}
    </div>
  );
};

// =========================================================
// CENA 1 — 0-3s — Hook funcionario tira 30 dias
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

  const numberSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const numberScale = interpolate(numberSpring, [0, 1], [0.5, 1]);
  const numberOpacity = interpolate(numberSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const capSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
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
        gap: isVertical ? 30 : 20,
        padding: isVertical ? "120px 60px" : "60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(239,68,68,0.18), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 70 : 50,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: 900,
        }}
      >
        Seu funcionário tira
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: isVertical ? 24 : 18,
          opacity: numberOpacity,
          transform: `scale(${numberScale * pulse})`,
        }}
      >
        <span
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 360 : 260,
            fontWeight: 800,
            color: THEME.red,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            textShadow: `0 0 80px rgba(239,68,68,0.5)`,
          }}
        >
          30
        </span>
        <span
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 80 : 56,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
          }}
        >
          dias de férias
        </span>
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 50 : 36,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.02em",
          textAlign: "center",
          lineHeight: 1.2,
          opacity: capOpacity,
        }}
      >
        por ano.{" "}
        <span style={{ color: THEME.textMuted, fontWeight: 500 }}>
          Plus dias doentes. Plus feriados.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-10s — Calendar com funcionario humano
// =========================================================
const SceneCalendarioHumano: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const days = React.useMemo(() => buildHumanCalendar(), []);

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);

  const revealProgress = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const capSpring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capScale = interpolate(capSpring, [0, 1], [0.6, 1]);

  const pulse = 1 + Math.sin(frame / 10) * 0.02;

  const cellSize = isVertical ? 36 : 24;
  const cols = isVertical ? 19 : 25;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 32 : 20,
        padding: isVertical ? "100px 40px" : "40px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.15), transparent 65%)`,
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
        }}
      >
        365 dias no ano
      </div>

      <CalendarGrid
        days={days}
        cellSize={cellSize}
        cols={cols}
        revealProgress={revealProgress}
      />

      <div
        style={{
          display: "flex",
          gap: isVertical ? 20 : 14,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: headerOpacity,
        }}
      >
        {[
          { color: THEME.red, label: "30 férias" },
          { color: "#FB923C", label: "5 doente" },
          { color: "#A855F7", label: "12 feriados" },
          { color: "#64748B", label: "52 folgas" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: interFamily,
              fontSize: isVertical ? 22 : 16,
              color: THEME.text,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: isVertical ? 18 : 14,
                height: isVertical ? 18 : 14,
                background: item.color,
                borderRadius: 4,
              }}
            />
            {item.label}
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 70 : 52,
          fontWeight: 800,
          color: THEME.red,
          letterSpacing: "-0.03em",
          textAlign: "center",
          opacity: capOpacity,
          transform: `scale(${capScale * pulse})`,
          textShadow: `0 0 40px rgba(239,68,68,0.5)`,
          marginTop: isVertical ? 14 : 8,
        }}
      >
        27% do ano ={" "}
        <span style={{ color: THEME.text }}>sem atender</span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 3 — 10-13s — Transicao "E a IA?"
// =========================================================
const SceneTransicaoIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const darkOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
  });
  const flashOpacity = interpolate(frame, [18, 28, 50], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
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
            fontSize: isVertical ? 180 : 130,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.04em",
            textAlign: "center",
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textShadow: `0 0 60px ${THEME.verdeGlow}`,
            lineHeight: 1,
          }}
        >
          E a <span style={{ color: THEME.verde }}>IA</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 4 — 13-25s — Calendar OTIMIZE 365 dias verdes
// =========================================================
const SceneCalendarioIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const days = React.useMemo(() => Array(365).fill("available" as DayStatus), []);

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);

  const revealProgress = interpolate(frame, [18, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const capSpring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capScale = interpolate(capSpring, [0, 1], [0.6, 1]);

  const pulse = 1 + Math.sin(frame / 9) * 0.025;

  const cellSize = isVertical ? 36 : 24;
  const cols = isVertical ? 19 : 25;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 32 : 20,
        padding: isVertical ? "100px 40px" : "40px",
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
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 64 : 46,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            textAlign: "center",
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
          }}
        >
          OTIMIZE = 365 dias
        </div>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 26 : 20,
            color: THEME.textMuted,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Todos os dias. Todas as horas.
        </div>
      </div>

      <CalendarGrid
        days={days}
        cellSize={cellSize}
        cols={cols}
        revealProgress={revealProgress}
        allAvailable
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          opacity: capOpacity,
          transform: `scale(${capScale * pulse})`,
          textAlign: "center",
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
            lineHeight: 1.15,
          }}
        >
          0 dias sem atender
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 44 : 32,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          0 férias. 0 doença.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CHECK CARD — usado em CENA 5 (sequencial)
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
          background: `radial-gradient(ellipse at 50% 50%, rgba(0,255,135,0.18), transparent 65%)`,
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
            fontSize: isVertical ? 64 : 44,
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
// CENA 6 — 30-35s — TesteGratisBadge + logo
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
// COMPOSICAO RAIZ — V2B_FuncionarioFalta (35s @ 30fps = 1050 frames)
// =========================================================
export const V2B_FuncionarioFalta: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* 0-3s — Hook 30 dias de ferias */}
      <Sequence from={0} durationInFrames={90} name="01-Hook">
        <SceneHook />
      </Sequence>

      {/* 3-10s — Calendar humano (7s = 210 frames) */}
      <Sequence from={90} durationInFrames={210} name="02-CalendarioHumano">
        <SceneCalendarioHumano />
      </Sequence>

      {/* 10-13s — Transicao "E a IA?" */}
      <Sequence from={300} durationInFrames={90} name="03-TransicaoIA">
        <SceneTransicaoIA />
      </Sequence>

      {/* 13-25s — Calendar OTIMIZE verde (12s = 360 frames) */}
      <Sequence from={390} durationInFrames={360} name="04-CalendarioIA">
        <SceneCalendarioIA />
      </Sequence>

      {/* 25-30s — 3 cards SEQUENCIAIS (5s = 150 frames, 50 frames cada) */}
      <Sequence from={750} durationInFrames={50} name="05-Check1">
        <CheckCard text="Atende em janeiro" />
      </Sequence>
      <Sequence from={800} durationInFrames={50} name="06-Check2">
        <CheckCard text="Atende no Natal" />
      </Sequence>
      <Sequence from={850} durationInFrames={50} name="07-Check3">
        <CheckCard text="Atende quando você dorme" />
      </Sequence>

      {/* 30-35s — TesteGratisBadge + logo */}
      <Sequence from={900} durationInFrames={150} name="08-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
