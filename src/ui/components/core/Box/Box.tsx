import { createBox } from "@shopify/restyle"

import type { Theme } from "@theme"

export type BoxProps = React.ComponentProps<typeof Box>
export const Box = createBox<Theme>()
