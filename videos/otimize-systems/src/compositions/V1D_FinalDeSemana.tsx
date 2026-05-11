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
// CENA 1 — 0-3s — Hook: Sabado 23h Cliente quer comprar AGORA
// =========================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
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
  const glowAlpha = interpolate(frame, [0, 30, 90], [0, 0.2, 0.28], {
    extrapolateRight: "clamp",
  });

  const sabSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const sabOpacity = interpolate(sabSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const sabY = interpolate(sabSpring, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 50 : 30,
        padding: isVertical ? "120px 60px" : "60px 60px",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124,58,237,${glowAlpha}), transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: spaceGroteskFamily,
          fontSize: isVertical ? 86 : 60,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: "-0.03em",
          textAlign: "center",
          opacity: sabOpacity,
          transform: `translateY(${sabY}px)`,
          textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          textTransform: "uppercase",
        }}
      >
        Sabado
      </div>

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
          textShadow: `0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.25)`,
          display: "flex",
          alignItems: "center",
          gap: isVertical ? 16 : 12,
        }}
      >
        <span>23</span>
        <span style={{ opacity: colonOpacity }}>:</span>
        <span>00</span>
      </div>

      <Caption
        text="Cliente quer comprar AGORA."
        highlight="AGORA."
        highlightColor={THEME.verde}
        fontSize={isVertical ? 64 : 44}
      />
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 2 — 3-10s — Sem IA: lead 23h, loja fechada, domingo perdeu
// =========================================================
const SceneSemIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const messages: WhatsAppMessage[] = [
    { from: 6, side: "in", text: "Tem M? Quero levar hoje! 23:00" },
    { from: 40, side: "in", text: "Oi? 23:30" },
    { from: 78, side: "in", text: "Ainda tem? 00:15" },
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
    frame: frame - 150,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const captionOpacity = interpolate(captionSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionY = interpolate(captionSpring, [0, 1], [30, 0]);

  const fechadaSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const fechadaOpacity = interpolate(fechadaSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fechadaScale = interpolate(fechadaSpring, [0, 1], [0.5, 1]);

  const mockupScale = isVertical ? 1.0 : 0.75;

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
          fontSize: isVertical ? 80 : 56,
          fontWeight: 800,
          color: THEME.red,
          letterSpacing: "-0.03em",
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          textShadow: "0 4px 24px rgba(239,68,68,0.5)",
          textAlign: "center",
          padding: "0 40px",
          textTransform: "uppercase",
          lineHeight: 1.05,
        }}
      >
        Loja fechou as 18h
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
          contactStatus="visto por ultimo 23:00"
          avatarLetter="C"
          avatarColor={THEME.red}
          messages={messages}
          scale={mockupScale}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transform: `scale(${fechadaScale})`,
            opacity: fechadaOpacity,
          }}
        >
          <div
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isVertical ? 50 : 32,
              fontWeight: 800,
              color: "#fff",
              background: THEME.red,
              padding: isVertical ? "12px 22px" : "8px 14px",
              borderRadius: 8,
              border: "3px dashed #fff",
              transform: "rotate(-12deg)",
              letterSpacing: "0.06em",
              boxShadow: "0 8px 32px rgba(239,68,68,0.6)",
            }}
          >
            FECHADA
          </div>
          <div style={{ fontSize: isVertical ? 60 : 40, marginTop: 10 }}>😴</div>
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
            fontSize: isVertical ? 52 : 36,
            fontWeight: 800,
            color: THEME.red,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          Domingo de manha:
        </div>
        <div
          style={{
            fontFamily: interFamily,
            fontSize: isVertical ? 34 : 24,
            fontWeight: 600,
            color: THEME.textMuted,
          }}
        >
          cliente foi pra outra loja.
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
            fontSize: isVertical ? 100 : 76,
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
          E se sua loja
          <br />
          vendesse <span style={{ color: THEME.verde }}>24h</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =========================================================
// CENA 4 — 13-22s — Com OTIMIZE: 23h12 lead, resposta 15s, fecha venda
// =========================================================
const SceneComOtimize: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const isVertical = height > width;

  const messages: WhatsAppMessage[] = [
    { from: 8, side: "in", text: "Tem M? Quero levar! 23:12:00" },
    {
      from: 22,
      side: "out",
      imageUrl: `url(${staticFile("products/vestido-floral.jpg")})`,
    },
    { from: 38, side: "out", text: "Sim! M, P, G — R$89,90 23:12:15" },
    { from: 58, side: "out", text: "Posso te mandar o Pix?" },
    { from: 100, side: "in", text: "Quero!" },
    { from: 130, side: "in", text: "💚 Pago agora!" },
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
          contactStatus="online agora (sabado 23h)"
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
            fontSize: isVertical ? 80 : 56,
            fontWeight: 800,
            color: THEME.verde,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textShadow: `0 0 40px ${THEME.verdeGlow}, 0 4px 24px rgba(0,255,135,0.4)`,
          }}
        >
          Venda fechada as 23h.
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isVertical ? 50 : 38,
            fontWeight: 700,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Voce so viu <span style={{ color: THEME.verde }}>segunda</span>.
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
    "Vende sabado e domingo",
    "Vende feriado",
    "Vende de madrugada",
    "Voce dorme, ela trabalha",
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
        Sua loja <span style={{ color: THEME.verde }}>24/7/365</span>
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
// COMPOSICAO RAIZ — V1D_FinalDeSemana (30s @ 30fps = 900 frames)
// =========================================================
export const V1D_FinalDeSemana: React.FC = () => {
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
