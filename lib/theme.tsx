// 1. Import the extendTheme function
import { extendTheme, NativeBaseProvider } from "native-base";
// 2. Extend the theme to include custom colors, fonts, etc
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const newColorTheme = {
  dark: {
    50: "#000000", //Main Background
    100: "#4A4458",
    200: "#4A4458", // Highlight icon
    300: "#49494B", // Button Background
    400: "#202020", // Second background
    500: "#CAC4D0", // Neutral icon inactive
    600: "#49454F", // Inputs background
    700: "#E6E1E5", // Input border,
    800: "#E8DEF8", // Neutral icon active
    900: "#D0BCFF", // Input border Active
  },
  light: {
    50: "#ffffff",
  },
  primary: {
    50: "#EA8529", // PRIMARY MAIN
  },
};
//change the font size
export const theme = extendTheme({
  colors: newColorTheme,
  config,
  fontSizes: {
    xl: 22,
  },
});
