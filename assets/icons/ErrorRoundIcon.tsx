import { Circle, Path, Svg } from "react-native-svg"

import type { IconBase } from "@components"

export function ErrorRoundIcon({ size = 20, color = "black" }: IconBase) {
	return (
		<Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
			<Circle cx="24" cy="24" r="24" fill={color} />
			<Path
				stroke="white"
				d="M15 15.0004L31.2279 31.9996M15.7728 32L32 15"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</Svg>
	)
}
