
import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      light: "#65798C",
      main: "#181A1E",
      dark: "#09090a",
    },
    secondary: {
      light: "#FFCD1E",
      main: "#FA5B3B",
      dark: "#B32400",
    },
    text: {
      primary: "#707070",
      secondary: "#9B9B9B",
    },
    error: {
      main: "#FC3C00",
    },
    warning: {
      main: "#FCA600",
    },
    success: {
      main: "#00D34D",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F0F0F0",
      200: "#D7D9DD",
      300: "#C4C4C4",
      400: "#9B9B9B",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;