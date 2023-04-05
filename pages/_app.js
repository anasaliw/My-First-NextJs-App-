import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#635bff",
    },
    secondary: {
      main: "#635bff",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
