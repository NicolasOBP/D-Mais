import { G, Path, Svg } from "react-native-svg"

import type { IconBase } from "@components"

export function ChevronDownIcon({ size = 20, color = "black" }: IconBase) {
	return (
		<Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
			<G transform={`rotate(90 ${size / 2} ${size / 2})`}>
				<Path
					d="M7 4L14 10L7 16"
					strokeWidth={2}
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</G>
		</Svg>
	)
}
