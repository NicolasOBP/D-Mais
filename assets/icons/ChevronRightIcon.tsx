import { Path, Svg } from "react-native-svg"

import type { IconBase } from "@components"

export function ChevronRightIcon({ size = 20, color = "black" }: IconBase) {
	return (
		<Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
			<Path
				d="M7 4L14 10L7 16"
				strokeWidth={2}
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}
