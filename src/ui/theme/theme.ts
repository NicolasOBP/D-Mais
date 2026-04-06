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
    backgroundContrast: palette.black,

    // Text colors
    title: palette.blue,
    text: palette.black,
    contrastPrimary: palette.white,
    tabBar: palette.blue,

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
    s42: 42,
    s46: 46,
    s48: 48,
    s56: 56,
    s62: 62,
    s80: 80,
    default: 16,
  },

  textVariants: {
    defaults: {
      fontFamily: "InterRegular",
      fontSize: 16,
      lineHeight: 22,
      color: "text",
    },
    // Headings - 24px Bold/Extra Bold
    title24Bold: {
      fontSize: 24,
      fontFamily: "InterBold",
      lineHeight: 30,
      color: "title",
    },
    title24: {
      fontSize: 24,
      fontFamily: "InterSemiBold",
      lineHeight: 30,
      color: "title",
    },
    title20: {
      fontSize: 20,
      fontFamily: "InterSemiBold",
      lineHeight: 26,
      color: "title",
    },
    title16: {
      fontSize: 16,
      fontFamily: "InterSemiBold",
      lineHeight: 22,
      color: "title",
    },
    title12: {
      fontSize: 12,
      fontFamily: "InterSemiBold",
      lineHeight: 18,
      color: "title",
    },

    // Text - 16px
    text16Bold: {
      fontFamily: "InterSemiBold",
      color: "contrastPrimary",
    },

    // Small text - 14px
    text14: {
      fontSize: 14,
      lineHeight: 20,
    },

    // Small text - 12px
    text12: {
      fontSize: 12,
      lineHeight: 18,
    },
    text12Bold: {
      fontSize: 12,
      fontFamily: "InterSemiBold",
      lineHeight: 18,
      color: "contrastPrimary",
    },

    // Extra small text - 10px
    text10: {
      fontSize: 10,
      lineHeight: 16,
    },

    // Tab bar text - 12px SemiBold
    tabBar: {
      fontSize: 12,
      fontFamily: "InterSemiBold",
      lineHeight: 18,
      color: "tabBar",
    },
  },

  borderRadii: {
    default: 16,
    inputField: 12,
    rounded: 500,
  },

  boxShadow: {
    primary: "0px 15px 15px 0px rgba(0, 0, 0, 0.2)",
  },
});

export type Theme = typeof theme;
export type ThemeVariants = keyof Theme["textVariants"];
export type ThemeColor = keyof Theme["colors"];
export default theme;
