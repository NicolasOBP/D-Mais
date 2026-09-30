export type StringOrNumberKeyConstraint<TValue> = {
	[K in keyof TValue]: TValue[K] extends string | number ? K : never
}[keyof TValue]
