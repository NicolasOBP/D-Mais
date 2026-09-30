import type {
	BackgroundColorProps,
	BorderProps,
	LayoutProps,
	SpacingProps,
	SpacingShorthandProps,
} from "@shopify/restyle"

import type { Theme } from "./theme"

export type RestyleTypes = BackgroundColorProps<Theme> &
	SpacingProps<Theme> &
	BorderProps<Theme> &
	SpacingShorthandProps<Theme> &
	LayoutProps<Theme>
