import { Keyboard } from "react-native";

export function useHideKeyboard() {
  Keyboard.dismiss();
}
