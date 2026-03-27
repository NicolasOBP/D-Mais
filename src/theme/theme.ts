import { createTheme } from "@shopify/restyle";

const palette = {
  // Grayscale
  black: "#000000",
  gray1: "#636363",
  gray2: "#8E8E8E",
  gray3: "#B3B3B3",
  gray4: "#E1E1E1",
  gray5: "#F5F5F5",
  white: "#FFFFFF",

  // Primary
  blue: "#2E3250",
  lightBlue: "rgba(46, 50, 80, 0.21)",

  // Secondary
  carrot: "#F86F2D",
  carrotLight: "#FAE6DD",

  // Success
  green: "#4ABC86",
  lightGreen: "#D8FFEC",

  // Error
  red: "#EA3838",
  lightRed: "#FBECEC",

  transparent: "transparent",
};

const theme = createTheme({
  colors: {
    // Primary colors
    primary: palette.blue,
    primaryLight: palette.lightBlue,

    // Secondary colors
    secondary: palette.carrot,
    secondaryLight: palette.carrotLight,

    // Status colors
    success: palette.green,
    successLight: palette.lightGreen,
    error: palette.red,
    errorLight: palette.lightRed,

    // Neutral/Background colors
    background: palette.white,

    // Text colors
    title: palette.blue,
    text: palette.black,
    contrastPrimary: palette.white,

    // Raw palette for direct access
    ...palette,
  },

  spacing: {
    s2: 2,
    s4: 4,
    s8: 8,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s20: 20,
    s24: 24,
    s32: 32,
    s40: 40,
    s48: 48,
    s56: 56,
    default: 16,
  },

  textVariants: {
    defaults: {
      color: "text",
      fontFamily: "Inter",
      fontSize: 16,
      lineHeight: 22,
    },
    // Headings - 24px Bold/Extra Bold
    heading24Bold: {
      fontSize: 24,
      fontFamily: "Inter",
      fontWeight: "900",
      lineHeight: 28,
      color: "title",
    },
    heading24SemiBold: {
      fontSize: 24,
      fontFamily: "Inter",
      fontWeight: "700",
      lineHeight: 28,
      color: "title",
    },
    // Body text - 16px
    body16Regular: {
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "400",
      lineHeight: 22,
      color: "text",
    },
    body16Medium: {
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "500",
      lineHeight: 22,
      color: "text",
    },
    body16Light: {
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "200",
      lineHeight: 22,
      color: "text",
    },
    body16Bold: {
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "700",
      lineHeight: 22,
      color: "text",
    },
    // Small text - 12px
    body12Medium: {
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: "500",
      lineHeight: 15,
      color: "text",
    },
    body12Bold: {
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: "700",
      lineHeight: 15,
      color: "text",
    },
    // Extra small text - 10px
    body10Bold: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: "700",
      lineHeight: 14,
      color: "text",
    },
  },

  borderRadii: {
    default: 16,
    inputField: 16,
    rounded: 500,
  },
});

export type Theme = typeof theme;
export type ThemeColor = keyof Theme["colors"];
export default theme;
