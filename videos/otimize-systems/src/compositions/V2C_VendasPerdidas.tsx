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
// WHATSAPP CHAT LIST ITEM — lista de conversas
// =========================================================
type ChatItem = {
  name: string;
  avatarColor: string;
  avatarLetter: string;
  preview: string;
  time: string;
  status: "lost" | "answered";
};

const HUMAN_CHATS: ChatItem[] = [
  { name: "Cliente Ana", avatarColor: "#F472B6", avatarLetter: "A", preview: "Tem em estoque?", time: "19:42", status: "lost" },
  { name: "Pedro Vargas", avatarColor: "#60A5FA", avatarLetter: "P", preview: "Quanto custa?", time: "20:15", status: "lost" },
  { name: "Marina S.", avatarColor: "#FB923C", avatarLetter: "M", preview: "Manda foto?", time: "21:03", status: "lost" },
  { name: "João Costa", avatarColor: "#A855F7", avatarLetter: "J", preview: "Aceita Pix?", time: "21:48", status: "lost" },
  { name: "Lucas R.", avatarColor: "#10B981", avatarLetter: "L", preview: "Entrega hoje?", time: "22:30", status: "answered" },
  { name: "Carla Lima", avatarColor: "#EF4444", avatarLetter: "C", preview: "Tem tamanho M?", time: "23:11", status: "lost" },
  { name: "Bruno T.", avatarColor: "#F59E0B", avatarLetter: "B", preview: "Forma de pagamento?", time: "23:54", status: "lost" },
  { name: "Sofia N.", avatarColor: "#EC4899", avatarLetter: "S", preview: "Tô interessada", time: "00:22", status: "lost" },
  { name: "Rafael M.", avatarColor: "#8B5CF6", avatarLetter: "R", preview: "Faz desconto?", time: "01:08", status: "lost" },
  { name: "Julia P.", avatarColor: "#06B6D4", avatarLetter: "J", preview: "Reservar?", time: "02:45", status: "lost" },
];

const OTIMIZE_CHATS: ChatItem[] = HUMAN_CHATS.map((c) => ({
  ...c,
  status: "answered",
}));

const ChatListItem: React.FC<{
  item: ChatItem;
  isVertical: boolean;
  startFrame: number;
}> = ({ item, isVertical, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const entry = spring({
    frame: local,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(entry, [0, 1], [-30, 0]);

  const badgeSpring = spring({
    frame: local - 8,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.4, 1]);

  const isLost = item.status === "lost";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isVertical ? 22 : 16,
        padding: isVertical ? "18px 22px" : "12px 16px",
        background: isLost ? "rgba(239,68,68,0.08)" : "rgba(0,255,135,0.08)",
        borderRadius: 14,
        border: `2px solid ${isLost ? "rgba(239,68,68,0.3)" : "rgba(0,255,135,0.3)"}`,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          width: isVertical ? 64 : 46,
          height: isVertical ? 64 : 46,
          minWidth: isVertical ? 64 : 46,
          borderRadius: "50%",
          background: item.avatarColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 28 : 20,
          fontWeight: 800,
          color: "#000",
        }}
      >
        {item.avatarLetter}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 26 : 18,
            fontWeight: 700,
            color: THEME.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 20 : 14,
            color: THEME.textMuted,
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.preview}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 18 : 13,
            color: THEME.textMuted,
            fontWeight: 500,
          }}
        >
          {item.time}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: isVertical ? "5px 10px" : "3px 8px",
            borderRadius: 999,
            background: isLost ? THEME.red : THEME.verde,
            color: isLost ? "#fff" : "#000",
            fontFamily: spaceGroteskFamily,
            fontWeight: 800,
            fontSize: isVertical ? 16 : 12,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
            boxShadow: isLost
              ? `0 4px 16px rgba(239,68,68,0.4)`
              : `0 4px 16px rgba(0,255,135,0.4)`,
          }}
        >
          <span style={{ fontSize: isVertical ? 18 : 14, lineHeight: 1 }}>
            {isLost ? "×" : "✓"}
          </span>
          {isLost ? "Sem resposta" : "15s"}
        </div>
      </div>
    </div>
  );
};

const ChatList: React.FC<{
  chats: ChatItem[];
  isVertical: boolean;
  staggerStep?: number;
}> = ({ chats, isVertical, staggerStep = 8 }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isVertical ? 10 : 7,
        padding: isVertical ? 20 : 14,
        background: "rgba(11,20,26,0.7)",
        borderRadius: 22,
        border: `2px solid rgba(255,255,255,0.08)`,
        boxShadow: `0 30px 100px rgba(0,0,0,0.6)`,
        maxWidth: isVertical ? 960 : 720,
        width: "100%",
      }}
    >
      {chats.map((chat, i) => (
        <ChatListItem
          key={i}
          item={chat}
          isVertical={isVertical}
          startFrame={i * staggerStep}
        />
      ))}
    </div>
  );
};

// =========================================================
// CENA 1 — 0-3s — Hook 9 de cada 10
// =========================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const stat1Spring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const stat1Scale = interpolate(stat1Spring, [0, 1], [0.5, 1]);
  const stat1Opacity = interpolate(stat1Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const sub1Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const sub1Opacity = interpolate(sub1Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const sub1Y = interpolate(sub1Spring, [0, 1], [30, 0]);

  const sub2Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const sub2Opacity = interpolate(sub2Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const sub2Scale = interpolate(sub2Spring, [0, 1], [0.7, 1]);

  const pulse = 1 + Math.sin(frame / 9) * 0.025;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 24 : 16,
        padding: isVertical ? "100px 60px" : "60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(239,68,68,0.2), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: isVertical ? 24 : 18,
          opacity: stat1Opacity,
          transform: `scale(${stat1Scale * pulse})`,
        }}
      >
        <span
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 380 : 260,
            fontWeight: 800,
            color: THEME.red,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            textShadow: `0 0 80px rgba(239,68,68,0.5)`,
          }}
        >
          9
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isVertical ? 50 : 36,
              fontWeight: 700,
              color: THEME.text,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            de cada
          </span>
          <span
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isVertical ? 110 : 78,
              fontWeight: 800,
              color: THEME.text,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            10
          </span>
        </div>
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 52 : 38,
          fontWeight: 700,
          color: THEME.text,
          letterSpacing: "-0.02em",
          textAlign: "center",
          opacity: sub1Opacity,
          transform: `translateY(${sub1Y}px)`,
          lineHeight: 1.2,
          maxWidth: 900,
        }}
      >
        mensagens não respondidas
      </div>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 64 : 46,
          fontWeight: 800,
          color: THEME.red,
          letterSpacing: "-0.03em",
          textAlign: "center",
          opacity: sub2Opacity,
          transform: `scale(${sub2Scale})`,
          textShadow: `0 0 40px rgba(239,68,68,0.5)`,
          marginTop: isVertical ? 10 : 4,
        }}
      >
        viram venda <span style={{ textDecoration: "underline" }}>perdida</span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-10s — Lista WhatsApp com 9/10 perdidas
// =========================================================
const SceneListaHumana: React.FC = () => {
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
    frame: frame - 170,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capScale = interpolate(capSpring, [0, 1], [0.7, 1]);

  const pulse = 1 + Math.sin(frame / 10) * 0.02;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 26 : 16,
        padding: isVertical ? "80px 40px 60px 40px" : "30px 40px",
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
          fontSize: isVertical ? 52 : 38,
          fontWeight: 800,
          color: THEME.red,
          letterSpacing: "-0.02em",
          textAlign: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          textShadow: `0 0 30px rgba(239,68,68,0.4)`,
        }}
      >
        Caixa de entrada — hoje
      </div>

      <Sequence from={15}>
        <ChatList chats={HUMAN_CHATS} isVertical={isVertical} staggerStep={6} />
      </Sequence>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 56 : 40,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.02em",
          textAlign: "center",
          opacity: capOpacity,
          transform: `scale(${capScale * pulse})`,
          lineHeight: 1.15,
        }}
      >
        Sua loja: hoje.{" "}
        <span style={{ color: THEME.red }}>Quantas?</span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 3 — 10-13s — Transicao "OTIMIZE muda o jogo"
// =========================================================
const SceneTransicao: React.FC = () => {
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
  const titleScale = interpolate(titleSpring, [0, 1], [0.6, 1]);
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
            fontSize: isVertical ? 110 : 80,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.03em",
            textAlign: "center",
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textShadow: `0 0 60px ${THEME.verdeGlow}`,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          <span style={{ color: THEME.verde }}>OTIMIZE</span> muda o jogo
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 4 — 13-25s — Lista WhatsApp OTIMIZE 100% respondidas
// =========================================================
const SceneListaOtimize: React.FC = () => {
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
    frame: frame - 280,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const capOpacity = interpolate(capSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capScale = interpolate(capSpring, [0, 1], [0.6, 1]);

  const pulse = 1 + Math.sin(frame / 9) * 0.025;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 26 : 16,
        padding: isVertical ? "80px 40px 60px 40px" : "30px 40px",
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
            fontSize: isVertical ? 58 : 42,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.02em",
            textAlign: "center",
            textShadow: `0 0 40px ${THEME.verdeGlow}`,
          }}
        >
          Caixa de entrada — com OTIMIZE
        </div>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 24 : 18,
            color: THEME.textMuted,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Respondidas em 15 segundos
        </div>
      </div>

      <Sequence from={20}>
        <ChatList chats={OTIMIZE_CHATS} isVertical={isVertical} staggerStep={10} />
      </Sequence>

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 64 : 46,
          fontWeight: 800,
          color: THEME.verde,
          letterSpacing: "-0.03em",
          textAlign: "center",
          opacity: capOpacity,
          transform: `scale(${capScale * pulse})`,
          textShadow: `0 0 50px ${THEME.verdeGlow}`,
          lineHeight: 1.1,
        }}
      >
        100% das mensagens{" "}
        <span style={{ color: THEME.text }}>respondidas</span>
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
// CENA FINAL — 30-35s
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
// COMPOSICAO RAIZ — V2C_VendasPerdidas (35s @ 30fps = 1050 frames)
// =========================================================
export const V2C_VendasPerdidas: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Background variant="dark" />

      {/* 0-3s — Hook 9/10 */}
      <Sequence from={0} durationInFrames={90} name="01-Hook">
        <SceneHook />
      </Sequence>

      {/* 3-10s — Lista humana com 9/10 perdidas */}
      <Sequence from={90} durationInFrames={210} name="02-ListaHumana">
        <SceneListaHumana />
      </Sequence>

      {/* 10-13s — Transicao "OTIMIZE muda o jogo" */}
      <Sequence from={300} durationInFrames={90} name="03-Transicao">
        <SceneTransicao />
      </Sequence>

      {/* 13-25s — Lista OTIMIZE 100% respondidas */}
      <Sequence from={390} durationInFrames={360} name="04-ListaOtimize">
        <SceneListaOtimize />
      </Sequence>

      {/* 25-30s — 3 cards sequenciais (50 frames cada) */}
      <Sequence from={750} durationInFrames={50} name="05-Check1">
        <CheckCard text="Nenhuma mensagem perdida" />
      </Sequence>
      <Sequence from={800} durationInFrames={50} name="06-Check2">
        <CheckCard text="Cada lead é tratado" />
      </Sequence>
      <Sequence from={850} durationInFrames={50} name="07-Check3">
        <CheckCard text="Conversão sobe na sua loja" />
      </Sequence>

      {/* 30-35s — Logo + TesteGratisBadge */}
      <Sequence from={900} durationInFrames={150} name="08-Final">
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
