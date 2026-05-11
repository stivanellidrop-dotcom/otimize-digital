import React from "react";
import { Composition, Folder } from "remotion";
import { VideoA } from "./compositions/VideoA";
import { VideoB } from "./compositions/VideoB";
import { VideoC } from "./compositions/VideoC";
import { V1A_FechamentoNoturno } from "./compositions/V1A_FechamentoNoturno";
import { V1B_PerguntasRepetidas } from "./compositions/V1B_PerguntasRepetidas";
import { V1C_ConcorrenciaTempo } from "./compositions/V1C_ConcorrenciaTempo";
import { V1D_FinalDeSemana } from "./compositions/V1D_FinalDeSemana";
import { V2A_70Porcento } from "./compositions/V2A_70Porcento";
import { V2B_FuncionarioFalta } from "./compositions/V2B_FuncionarioFalta";
import { V2C_VendasPerdidas } from "./compositions/V2C_VendasPerdidas";
import { V2D_QuatroCanais } from "./compositions/V2D_QuatroCanais";
import { V3A_EmporioFloral } from "./compositions/V3A_EmporioFloral";
import { V3B_ClienteDuvidas } from "./compositions/V3B_ClienteDuvidas";
import { V3C_DomingoMadrugada } from "./compositions/V3C_DomingoMadrugada";
import { V3D_ClienteDificil } from "./compositions/V3D_ClienteDificil";

const FPS = 30;

type CompDef = {
  id: string;
  component: React.FC;
  seconds: number;
};

const CAMPAIGN_V2: CompDef[] = [
  { id: "V1A-FechamentoNoturno", component: V1A_FechamentoNoturno, seconds: 30 },
  { id: "V1B-PerguntasRepetidas", component: V1B_PerguntasRepetidas, seconds: 30 },
  { id: "V1C-ConcorrenciaTempo", component: V1C_ConcorrenciaTempo, seconds: 30 },
  { id: "V1D-FinalDeSemana", component: V1D_FinalDeSemana, seconds: 30 },
  { id: "V2A-70Porcento", component: V2A_70Porcento, seconds: 40 },
  { id: "V2B-FuncionarioFalta", component: V2B_FuncionarioFalta, seconds: 35 },
  { id: "V2C-VendasPerdidas", component: V2C_VendasPerdidas, seconds: 35 },
  { id: "V2D-QuatroCanais", component: V2D_QuatroCanais, seconds: 40 },
  { id: "V3A-EmporioFloral", component: V3A_EmporioFloral, seconds: 40 },
  { id: "V3B-ClienteDuvidas", component: V3B_ClienteDuvidas, seconds: 40 },
  { id: "V3C-DomingoMadrugada", component: V3C_DomingoMadrugada, seconds: 35 },
  { id: "V3D-ClienteDificil", component: V3D_ClienteDificil, seconds: 40 },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Campaign-V2-Vertical-1080x1920">
        {CAMPAIGN_V2.map((c) => (
          <Composition
            key={c.id}
            id={c.id}
            component={c.component}
            durationInFrames={c.seconds * FPS}
            fps={FPS}
            width={1080}
            height={1920}
          />
        ))}
      </Folder>
      <Folder name="Campaign-V2-Square-1080x1080">
        {CAMPAIGN_V2.map((c) => (
          <Composition
            key={`${c.id}-square`}
            id={`${c.id}-square`}
            component={c.component}
            durationInFrames={c.seconds * FPS}
            fps={FPS}
            width={1080}
            height={1080}
          />
        ))}
      </Folder>
      <Folder name="Legacy-V1-Vertical-1080x1920">
        <Composition id="VideoA" component={VideoA} durationInFrames={30 * FPS} fps={FPS} width={1080} height={1920} />
        <Composition id="VideoB" component={VideoB} durationInFrames={45 * FPS} fps={FPS} width={1080} height={1920} />
        <Composition id="VideoC" component={VideoC} durationInFrames={40 * FPS} fps={FPS} width={1080} height={1920} />
      </Folder>
      <Folder name="Legacy-V1-Square-1080x1080">
        <Composition id="VideoA-square" component={VideoA} durationInFrames={30 * FPS} fps={FPS} width={1080} height={1080} />
        <Composition id="VideoB-square" component={VideoB} durationInFrames={45 * FPS} fps={FPS} width={1080} height={1080} />
        <Composition id="VideoC-square" component={VideoC} durationInFrames={40 * FPS} fps={FPS} width={1080} height={1080} />
      </Folder>
    </>
  );
};
