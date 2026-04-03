import { EyeOffIcon } from "../../../../assets/icons/EyeOffIcon";
import { EyeOnIcon } from "../../../../assets/icons/EyeOnIcon";
import { SearchIcon } from "../../../../assets/icons/SearchIcon";

export const iconRegistry = {
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  search: SearchIcon,
};

export type IconType = typeof iconRegistry;

export type IconNames = keyof IconType;
