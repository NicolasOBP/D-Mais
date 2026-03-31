import { EyeOffIcon } from "assets/icons/EyeOffIcon";
import { EyeOnIcon } from "assets/icons/EyeOnIcon";

export const iconRegistry = {
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
};

export type IconType = typeof iconRegistry;

export type IconNames = keyof IconType;
