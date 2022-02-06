import { createTheme } from "@mui/material/styles";
import { orange, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      roseWhite: string;
      mossGreen: string;
      plantation: string;
      flamingo: string;
      anzac: string;
      rangitoto: string;
      nickel: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      roseWhite?: string;
      mossGreen?: string;
      plantation?: string;
      flamingo?: string;
      anzac?: string;
      rangitoto?: string;
      nickel?: string;
    };
  }
}

// Create a theme instance.
const theme = createTheme({
  colors: {
    roseWhite: "#FFFCFC",
    mossGreen: "#A7D5B7",
    plantation: "#28534E",
    flamingo: "#EB5937",
    anzac: "#DABE45",
    rangitoto: "#312F23",
    nickel: "#727272",
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
