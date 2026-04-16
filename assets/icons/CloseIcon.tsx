import { Path, Svg } from "react-native-svg";

import { IconBase } from "@components";

export function CloseIcon({ size = 20, color = "black" }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.5 1.50039L17.7279 18.4996M2.27276 18.5L18.5 1.5"
        strokeWidth={3}
        stroke={color}
        strokeLinecap="round"
      />
    </Svg>
  );
}
