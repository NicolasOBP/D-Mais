import { ArrowLeftIcon } from "../../../../assets/icons/ArrowLeftIcon";
import { CartFillIcon } from "../../../../assets/icons/CartFillIcon";
import { CartIcon } from "../../../../assets/icons/CartIcon";
import { CheckIcon } from "../../../../assets/icons/CheckIcon";
import { ChevronRightIcon } from "../../../../assets/icons/ChevronRightIcon";
import { CloseIcon } from "../../../../assets/icons/CloseIcon";
import { EyeOffIcon } from "../../../../assets/icons/EyeOffIcon";
import { EyeOnIcon } from "../../../../assets/icons/EyeOnIcon";
import { HomeFillIcon } from "../../../../assets/icons/HomeFillIcon";
import { HomeIcon } from "../../../../assets/icons/HomeIcon";
import { OrderFillIcon } from "../../../../assets/icons/OrderFillIcon";
import { OrderIcon } from "../../../../assets/icons/OrderIcon";
import { PencilIcon } from "../../../../assets/icons/PencilIcon";
import { SearchIcon } from "../../../../assets/icons/SearchIcon";
import { TrashIcon } from "../../../../assets/icons/TrashIcon";

export const iconRegistry = {
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  search: SearchIcon,
  home: HomeIcon,
  homeFill: HomeFillIcon,
  order: OrderIcon,
  orderFill: OrderFillIcon,
  close: CloseIcon,
  cart: CartIcon,
  cartFill: CartFillIcon,
  arrowLeft: ArrowLeftIcon,
  pencil: PencilIcon,
  check: CheckIcon,
  trash: TrashIcon,
  chevronRight: ChevronRightIcon,
};

export type IconType = typeof iconRegistry;

export type IconNames = keyof IconType;
