import React from "react";
import { Composition, Folder } from "remotion";
import { VideoA } from "./compositions/VideoA";
import { VideoB } from "./compositions/VideoB";
import { VideoC } from "./compositions/VideoC";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="OTIMIZE-Vertical-1080x1920">
        <Composition
          id="VideoA"
          component={VideoA}
          durationInFrames={30 * FPS}
          fps={FPS}
          width={1080}
          height={1920}
        />
        <Composition
          id="VideoB"
          component={VideoB}
          durationInFrames={45 * FPS}
          fps={FPS}
          width={1080}
          height={1920}
        />
        <Composition
          id="VideoC"
          component={VideoC}
          durationInFrames={40 * FPS}
          fps={FPS}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="OTIMIZE-Square-1080x1080">
        <Composition
          id="VideoA-square"
          component={VideoA}
          durationInFrames={30 * FPS}
          fps={FPS}
          width={1080}
          height={1080}
        />
        <Composition
          id="VideoB-square"
          component={VideoB}
          durationInFrames={45 * FPS}
          fps={FPS}
          width={1080}
          height={1080}
        />
        <Composition
          id="VideoC-square"
          component={VideoC}
          durationInFrames={40 * FPS}
          fps={FPS}
          width={1080}
          height={1080}
        />
      </Folder>
    </>
  );
};
