import { Path, Svg } from "react-native-svg";

import { IconBase } from "@components";

export function CheckIcon({ size = 20, color = "black" }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.6669 6.33596C16.1121 6.78391 16.1121 7.5102 15.6669 7.95815L9.61514 14.0761C9.16993 14.5241 8.44823 14.5241 8.00298 14.0761L4.3339 10.3697C3.8887 9.92175 3.8887 9.19559 4.3339 8.74762C4.77909 8.29965 5.50091 8.29965 5.9461 8.74762L8.80908 11.6428L14.0548 6.33596C14.5 5.88801 15.2217 5.88801 15.6669 6.33596Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      />
    </Svg>
  );
}
