import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

export const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const { fontFamily: spaceGroteskFamily } = loadSpaceGrotesk("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
