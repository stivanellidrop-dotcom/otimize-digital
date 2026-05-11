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
import { THEME } from "../theme";
import { spaceGroteskFamily, interFamily } from "../fonts";
import { Background } from "../components/Background";
import {
  WhatsAppMockup,
  WhatsAppMessage,
} from "../components/WhatsAppMockup";

// =============================================================
// VideoC - V2 Igor - "Behind the scenes / Revelação" - 40s @ 30fps
// 1200 frames totais
// Estratégia: surpresa positiva. Lead acabou de conversar com agente
// IA no Empório Stivanelli e agora descobre que era IA o tempo todo.
// Funciona em 1080x1920 (vertical) e 1080x1080 (square).
// =============================================================

// Flags de áudio: deixar música opcional caso o asset não esteja presente.
const MUSIC_ENABLED = true;
const VOICEOVER_ENABLED = true;

// Asset do produto real (path relativo ao public/).
// O componente WhatsAppMockup usa esta string como CSS `background`,
// então passamos url() apontando para o staticFile.
const PRODUCT_IMAGE_BG = `url("${staticFile("products/vestido-floral.jpg")}")`;

// ---- Cena 1: Recap WhatsApp Empório Stivanelli (0-210 = 0-7s) ----
const SceneRecapWhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // Mensagens com timing escalonado (frame absoluto dentro da Sequence)
  // A 3a mensagem agora usa foto REAL do produto (vestido-floral) ao invés
  // do gradient rosa de antes.
  const messages: WhatsAppMessage[] = [
    {
      from: 18,
      side: "in",
      text: "Oi! Bem-vinda 💚 Sou Ygor do Empório Stivanelli. O que vc tá procurando?",
    },
    {
      from: 54,
      side: "out",
      text: "Vestido floral M",
    },
    {
      from: 84,
      side: "in",
      imageUrl: PRODUCT_IMAGE_BG,
      text: "Esse aqui é nosso campeão! R$ 89,90 ou 3x sem juros",
    },
    {
      from: 132,
      side: "out",
      text: "Adorei! Quero",
    },
    {
      from: 162,
      side: "in",
      text: "Te mando link de pgto agora 💸",
    },
  ];

  // Mockup scale adapta vertical vs square
  const mockupScale = isSquare ? 0.78 : 0.9;

  // Caption "Você reparou?" - aparece cedo no topo
  const captionAppear = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 18, stiffness: 180 },
  });
  const captionOpacity = interpolate(captionAppear, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionTranslate = interpolate(captionAppear, [0, 1], [-20, 0]);

  // Fade-out de toda a cena nos últimos 18 frames
  const sceneExitStart = 192;
  const sceneOpacity = interpolate(
    frame,
    [sceneExitStart, 210],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Entrada do mockup
  const mockupEntry = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 140 },
  });
  const mockupScaleEntry = interpolate(mockupEntry, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isSquare ? 40 : 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: captionOpacity,
          transform: `translateY(${captionTranslate}px)`,
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 60 : 72,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            textShadow: `0 0 30px ${THEME.verdeGlow}, 0 2px 12px rgba(0,0,0,0.5)`,
            padding: "0 40px",
            textAlign: "center",
          }}
        >
          Você <span style={{ color: THEME.verde }}>reparou?</span>
        </div>
      </div>

      <div
        style={{
          transform: `scale(${mockupScaleEntry})`,
          marginTop: isSquare ? 40 : 120,
        }}
      >
        <WhatsAppMockup
          contactName="Empório Stivanelli"
          contactStatus="online agora"
          avatarLetter="E"
          avatarColor={THEME.verde}
          messages={messages}
          scale={mockupScale}
        />
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 2: Revelação - "Foi feito 100% por agente IA" (210-360 = 7-12s) ----
// V2: Logo OTIMIZE entra abaixo do texto reveal, com spring + glow.
const SceneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // Glow pulsante no fundo durante a revelação
  const glowPulse = 0.5 + Math.sin(frame / 8) * 0.25;

  // Linha 1 entra primeiro
  const line1Spring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.9 },
  });
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line1Scale = interpolate(line1Spring, [0, 1], [0.7, 1]);

  // Linha 2 entra 30 frames depois com impacto maior
  const line2Spring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 11, stiffness: 180, mass: 1 },
  });
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Scale = interpolate(line2Spring, [0, 1], [0.5, 1]);

  // Highlight "100% por agente IA" pulsa
  const highlightPulse = 1 + Math.sin(Math.max(0, frame - 30) / 6) * 0.04;

  // Logo OTIMIZE entra depois da linha 2 (frame 70)
  const logoSpring = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 12, stiffness: 150, mass: 1 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.4, 1]);
  const logoFloat = Math.sin(Math.max(0, frame - 70) / 12) * 4;

  // Fade out final
  const sceneOpacity = interpolate(
    frame,
    [130, 150],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoSize = isSquare ? 180 : 220;

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow verde por trás */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,255,135,${
            glowPulse * 0.35
          }) 0%, transparent 55%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 28 : 40,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 64 : 78,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          Tudo isso que você acabou de viver
        </div>
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 76 : 92,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            opacity: line2Opacity,
            transform: `scale(${line2Scale * highlightPulse})`,
          }}
        >
          foi feito{" "}
          <span
            style={{
              color: THEME.verde,
              textShadow: `0 0 40px ${THEME.verde}, 0 0 80px ${THEME.verdeGlow}`,
            }}
          >
            100% por agente IA
          </span>
        </div>

        {/* Logo OTIMIZE - aparece abaixo do reveal */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale}) translateY(${logoFloat}px)`,
            filter: `drop-shadow(0 0 40px ${THEME.verde}) drop-shadow(0 0 20px ${THEME.verdeGlow})`,
            marginTop: isSquare ? 10 : 20,
          }}
        >
          <Img
            src={staticFile("otimize-logo.svg")}
            style={{ width: logoSize, height: logoSize, display: "block" }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 3: Recap cards animados + banner (360-660 = 12-22s) ----
const SceneFeatureCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  const cards = [
    "Boas vindas personalizadas",
    "Catálogo automático",
    "Foto do produto",
    "Preço e parcelamento",
    "Follow-up de compra",
  ];

  // Cada card entra a cada 22 frames (~0.73s)
  const cardStartOffsets = cards.map((_, i) => 10 + i * 22);

  // Banner aparece depois do último card
  const bannerStart = cardStartOffsets[cardStartOffsets.length - 1] + 30;
  const bannerSpring = spring({
    frame: Math.max(0, frame - bannerStart),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const bannerOpacity = interpolate(bannerSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bannerScale = interpolate(bannerSpring, [0, 1], [0.85, 1]);

  // Fade out
  const sceneOpacity = interpolate(
    frame,
    [275, 300],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? "60px 80px" : "120px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isSquare ? 18 : 26,
          width: "100%",
          maxWidth: 900,
          alignItems: "stretch",
        }}
      >
        {cards.map((label, i) => {
          const local = frame - cardStartOffsets[i];
          if (local < 0) return null;

          const cardSpring = spring({
            frame: local,
            fps,
            config: { damping: 14, stiffness: 180 },
          });
          const opacity = interpolate(cardSpring, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          });
          const translateX = interpolate(cardSpring, [0, 1], [-80, 0]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                background: "rgba(13, 18, 32, 0.85)",
                border: `2px solid ${THEME.verde}`,
                borderRadius: 20,
                padding: isSquare ? "20px 32px" : "28px 40px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 24px ${THEME.verdeGlow}`,
              }}
            >
              <div
                style={{
                  width: isSquare ? 48 : 60,
                  height: isSquare ? 48 : 60,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${THEME.verde}, ${THEME.verdeDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isSquare ? 28 : 36,
                  fontWeight: 900,
                  color: "#000",
                  flexShrink: 0,
                  fontFamily: spaceGroteskFamily,
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontFamily: interFamily,
                  fontSize: isSquare ? 32 : 40,
                  fontWeight: 700,
                  color: THEME.text,
                  letterSpacing: "-0.01em",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}

        {/* Banner verde embaixo */}
        <div
          style={{
            marginTop: isSquare ? 24 : 40,
            opacity: bannerOpacity,
            transform: `scale(${bannerScale})`,
            background: `linear-gradient(135deg, ${THEME.verde} 0%, ${THEME.verdeDark} 100%)`,
            padding: isSquare ? "22px 32px" : "32px 40px",
            borderRadius: 24,
            textAlign: "center",
            fontFamily: spaceGroteskFamily,
            fontWeight: 900,
            fontSize: isSquare ? 34 : 44,
            color: "#000",
            letterSpacing: "-0.02em",
            boxShadow: `0 20px 60px ${THEME.verdeGlow}`,
          }}
        >
          Tudo automatizado. Tudo 24h. Tudo IA.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 4: Selling principal - 24h + Math (660-900 = 22-30s) ----
const SceneMath: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // Caption topo
  const topSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 160 },
  });
  const topOpacity = interpolate(topSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const topTranslate = interpolate(topSpring, [0, 1], [-30, 0]);

  // Math entra depois (frame 30)
  const mathSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const mathOpacity = interpolate(mathSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const mathScale = interpolate(mathSpring, [0, 1], [0.7, 1]);

  // Pieces da equação animados separadamente para impacto
  const piece2Opacity = interpolate(
    frame,
    [55, 75],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const piece3Opacity = interpolate(
    frame,
    [85, 110],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const piece3Scale = interpolate(
    frame,
    [85, 115],
    [0.6, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Caption final "Menos que diária"
  const finalSpring = spring({
    frame: Math.max(0, frame - 130),
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const finalOpacity = interpolate(finalSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const finalTranslate = interpolate(finalSpring, [0, 1], [30, 0]);

  // Fade out
  const sceneOpacity = interpolate(
    frame,
    [215, 240],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 40 : 70,
          textAlign: "center",
        }}
      >
        {/* Caption topo */}
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 64 : 80,
            fontWeight: 800,
            color: THEME.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: topOpacity,
            transform: `translateY(${topTranslate}px)`,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ color: THEME.verde }}>24h por dia.</span>
          <br />
          Sem cansar. Sem esquecer.
        </div>

        {/* Math visual */}
        <div
          style={{
            opacity: mathOpacity,
            transform: `scale(${mathScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            background: "rgba(13, 18, 32, 0.7)",
            border: `2px solid ${THEME.verde}`,
            borderRadius: 28,
            padding: isSquare ? "32px 50px" : "48px 70px",
            boxShadow: `0 12px 50px ${THEME.verdeGlow}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isSquare ? 18 : 28,
              flexWrap: "wrap",
              justifyContent: "center",
              fontFamily: spaceGroteskFamily,
              fontWeight: 800,
              fontSize: isSquare ? 56 : 72,
              color: THEME.text,
              letterSpacing: "-0.02em",
            }}
          >
            <span>R$ 597/mês</span>
            <span
              style={{
                opacity: piece2Opacity,
                color: THEME.verde,
              }}
            >
              ÷ 30 dias
            </span>
            <span
              style={{
                opacity: piece2Opacity,
                color: THEME.textMuted,
              }}
            >
              =
            </span>
            <span
              style={{
                opacity: piece3Opacity,
                transform: `scale(${piece3Scale})`,
                color: THEME.verde,
                fontSize: isSquare ? 72 : 96,
                textShadow: `0 0 30px ${THEME.verde}, 0 0 60px ${THEME.verdeGlow}`,
                display: "inline-block",
              }}
            >
              R$ 20/dia
            </span>
          </div>
        </div>

        {/* Caption final */}
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 48 : 60,
            fontWeight: 700,
            color: THEME.textMuted,
            letterSpacing: "-0.01em",
            opacity: finalOpacity,
            transform: `translateY(${finalTranslate}px)`,
            fontStyle: "italic",
          }}
        >
          Menos que diária de funcionário
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 5: Pitch CTA - "Imagina isso na SUA loja" (900-1080 = 30-36s) ----
// V2: logo OTIMIZE grande centralizado (substitui o OtimizeLogo placeholder)
const ScenePitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // Caption "Imagina isso..."
  const captionSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const captionOpacity = interpolate(captionSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionScale = interpolate(captionSpring, [0, 1], [0.7, 1]);

  // "SUA" piscando/pulsando
  const suaPulse = 1 + Math.sin(frame / 7) * 0.08;
  const suaGlow = 0.6 + Math.sin(frame / 6) * 0.4;

  // Logo entra depois (frame 50) - grande centralizado com glow
  const logoSpring = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoGlowPulse = 0.7 + Math.sin(frame / 9) * 0.3;

  // Fade out
  const sceneOpacity = interpolate(
    frame,
    [160, 180],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoSize = isSquare ? 360 : 440;

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      {/* Glow grande de fundo no logo */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 60%, rgba(0,255,135,${
            logoGlowPulse * 0.35
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
          gap: isSquare ? 60 : 100,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: spaceGroteskFamily,
            fontSize: isSquare ? 76 : 100,
            fontWeight: 900,
            color: THEME.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            opacity: captionOpacity,
            transform: `scale(${captionScale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          Imagina isso atendendo na{" "}
          <span
            style={{
              color: THEME.verde,
              display: "inline-block",
              transform: `scale(${suaPulse})`,
              textShadow: `0 0 ${30 * suaGlow}px ${THEME.verde}, 0 0 ${
                60 * suaGlow
              }px ${THEME.verdeGlow}`,
            }}
          >
            SUA
          </span>{" "}
          loja.
        </div>

        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 60px ${THEME.verde}) drop-shadow(0 0 30px ${THEME.verdeGlow})`,
          }}
        >
          <Img
            src={staticFile("otimize-logo.svg")}
            style={{ width: logoSize, height: logoSize, display: "block" }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Cena 6: Final Card - Logo + Ancoragem R$997 -> R$597 + CTA + Contato (1080-1200 = 36-40s) ----
const SceneFinalCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const isSquare = height <= 1080;

  // Logo entra primeiro
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoTranslate = interpolate(logoSpring, [0, 1], [-20, 0]);

  // Badge PROMOÇÃO pulsante - entra logo após o logo
  const promoSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const promoOpacity = interpolate(promoSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const promoEntryScale = interpolate(promoSpring, [0, 1], [0.7, 1]);
  const promoPulse = 1 + Math.sin(frame / 6) * 0.06;
  const promoGlow = 0.6 + Math.sin(frame / 7) * 0.4;

  // Preço antigo (R$ 997) com risco animado
  const oldPriceOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strikeProgress = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Preço novo (R$ 597) com bounce
  const newPriceSpring = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const newPriceOpacity = interpolate(newPriceSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const newPriceScale = interpolate(newPriceSpring, [0, 1], [0.5, 1]);
  const newPricePulse = 1 + Math.sin(frame / 8) * 0.02;

  // Contato (WhatsApp + URL)
  const contactSpring = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const contactOpacity = interpolate(contactSpring, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contactTranslate = interpolate(contactSpring, [0, 1], [20, 0]);

  const logoSize = isSquare ? 140 : 170;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? "40px 50px" : "40px 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 18 : 24,
          textAlign: "center",
        }}
      >
        {/* Logo real */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoTranslate}px)`,
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
            opacity: promoOpacity,
            transform: `scale(${promoEntryScale * promoPulse})`,
            background: `linear-gradient(135deg, ${THEME.red} 0%, #b91c1c 100%)`,
            color: "#fff",
            fontFamily: spaceGroteskFamily,
            fontWeight: 900,
            fontSize: isSquare ? 26 : 30,
            padding: isSquare ? "8px 24px" : "10px 28px",
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

        {/* Preço antigo riscado */}
        <div
          style={{
            position: "relative",
            opacity: oldPriceOpacity,
            fontFamily: spaceGroteskFamily,
            fontWeight: 700,
            fontSize: isSquare ? 44 : 54,
            color: THEME.textMuted,
            letterSpacing: "-0.02em",
            padding: "0 8px",
          }}
        >
          <span style={{ opacity: 0.85 }}>De R$ 997</span>
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
            fontSize: isSquare ? 100 : 124,
            padding: isSquare ? "16px 36px" : "20px 44px",
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
            fontSize: isSquare ? 24 : 28,
            color: THEME.text,
            fontWeight: 600,
            marginTop: -4,
            maxWidth: isSquare ? 600 : 720,
          }}
        >
          por mês,{" "}
          <span style={{ color: THEME.verde, fontWeight: 700 }}>
            enquanto tiver vagas
          </span>
        </div>

        {/* Contato (WhatsApp + URL) */}
        <div
          style={{
            opacity: contactOpacity,
            transform: `translateY(${contactTranslate}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isSquare ? 10 : 14,
            marginTop: isSquare ? 10 : 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "rgba(13, 18, 32, 0.85)",
              border: `2px solid ${THEME.verde}`,
              borderRadius: 18,
              padding: isSquare ? "12px 22px" : "16px 28px",
              boxShadow: `0 8px 30px ${THEME.verdeGlow}`,
              fontFamily: interFamily,
              fontSize: isSquare ? 28 : 34,
              fontWeight: 700,
              color: THEME.text,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: THEME.verde }}>WhatsApp</span>
            <span>(11) 97820-2286</span>
          </div>
          <div
            style={{
              fontFamily: spaceGroteskFamily,
              fontSize: isSquare ? 30 : 38,
              fontWeight: 800,
              color: THEME.text,
              letterSpacing: "-0.02em",
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

// =============================================================
// Composição principal - 1200 frames @ 30fps = 40s
// =============================================================
export const VideoC: React.FC = () => {
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
          src={staticFile("voiceover/videoC-narration.mp3")}
          volume={1.0}
        />
      )}

      {/* Cena 1: Recap WhatsApp (0-7s) - agora com foto real do vestido */}
      <Sequence from={0} durationInFrames={210}>
        <SceneRecapWhatsApp />
      </Sequence>

      {/* Cena 2: Revelação IA (7-12s) - agora com logo OTIMIZE abaixo do reveal */}
      <Sequence from={210} durationInFrames={150}>
        <SceneReveal />
      </Sequence>

      {/* Cena 3: Recap features + banner (12-22s) */}
      <Sequence from={360} durationInFrames={300}>
        <SceneFeatureCards />
      </Sequence>

      {/* Cena 4: 24h + Math (22-30s) */}
      <Sequence from={660} durationInFrames={240}>
        <SceneMath />
      </Sequence>

      {/* Cena 5: Pitch CTA (30-36s) - logo grande centralizado */}
      <Sequence from={900} durationInFrames={180}>
        <ScenePitch />
      </Sequence>

      {/* Cena 6: Final card (36-40s) - logo + ancoragem R$997 -> R$597 */}
      <Sequence from={1080} durationInFrames={120}>
        <SceneFinalCard />
      </Sequence>
    </AbsoluteFill>
  );
};
