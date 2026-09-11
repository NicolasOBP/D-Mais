import { G, Path, Svg } from "react-native-svg"

import type { IconBase } from "@components"

export function InventoryFillIcon({ size = 20, color = "black" }: IconBase) {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 80.000000 80.000000"
			preserveAspectRatio="xMidYMid meet"
		>
			<G
				transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
				fill={color}
				stroke="none"
			>
				<Path
					d="M325 780 c-22 -11 -94 -58 -160 -103 -168 -115 -165 -108 -165 -389
0 -231 5 -258 47 -277 36 -17 59 -13 90 13 l28 24 5 189 5 188 225 0 225 0 5
-188 5 -189 28 -24 c31 -26 54 -30 90 -13 42 19 47 46 47 277 0 287 7 272
-192 406 -125 84 -154 99 -195 103 -35 3 -58 -1 -88 -17z"
				/>
				<Path
					d="M274 316 c-3 -7 -4 -35 -2 -62 3 -47 4 -49 36 -52 18 -2 40 2 48 9
17 14 19 90 2 107 -17 17 -77 15 -84 -2z"
				/>
				<Path
					d="M274 116 c-3 -7 -4 -35 -2 -62 3 -47 4 -49 36 -52 18 -2 40 2 48 9
17 14 19 90 2 107 -17 17 -77 15 -84 -2z"
				/>
				<Path
					d="M442 118 c-17 -17 -15 -93 2 -107 8 -7 30 -11 48 -9 l33 3 0 60 0 60
-35 3 c-19 2 -41 -3 -48 -10z"
				/>
			</G>
		</Svg>
	)
}
