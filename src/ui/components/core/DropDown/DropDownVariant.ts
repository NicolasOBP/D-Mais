import { BoxProps } from "../Box";
import {
  textInputVariant,
  TextInputVariant,
  TextInputVariantProps,
} from "../TextInput/TextInputVariant";

export type DropDownVariant = TextInputVariant;

export type DropDownStyles = {
  textInput: TextInputVariantProps;
  dropDown: {
    activeBackgroundColor: BoxProps["backgroundColor"];
  };
};

export const dropDownVariant: Record<DropDownVariant, DropDownStyles> = {
  primary: {
    textInput: textInputVariant["primary"],
    dropDown: {
      activeBackgroundColor: "gray5",
    },
  },
  secundary: {
    textInput: textInputVariant["secundary"],
    dropDown: {
      activeBackgroundColor: "gray3",
    },
  },
};
