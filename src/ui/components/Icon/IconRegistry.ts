import { EyeOffIcon } from "../../../../assets/icons/EyeOffIcon";
import { EyeOnIcon } from "../../../../assets/icons/EyeOnIcon";
import { HomeFillIcon } from "../../../../assets/icons/HomeFillIcon";
import { HomeIcon } from "../../../../assets/icons/HomeIcon";
import { OrderFillIcon } from "../../../../assets/icons/OrderFillIcon";
import { OrderIcon } from "../../../../assets/icons/OrderIcon";
import { SearchIcon } from "../../../../assets/icons/SearchIcon";

export const iconRegistry = {
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  search: SearchIcon,
  home: HomeIcon,
  homeFill: HomeFillIcon,
  order: OrderIcon,
  orderFill: OrderFillIcon,
};

export type IconType = typeof iconRegistry;

export type IconNames = keyof IconType;
