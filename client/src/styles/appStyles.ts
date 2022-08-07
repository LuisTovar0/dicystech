import {styled} from "@mui/system";
import {createTheme, Toolbar, Typography} from "@mui/material";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "grey"
    },
    secondary: {
      main: "#ffffff"
    }
  }
});

export const Navbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

export const PageName = styled(Typography)({
  fontSize: "2rem",
  // alignContent: "center"
  // marginTop: "17%"
});
