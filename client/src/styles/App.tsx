import {styled} from "@mui/system";
import {createTheme, Toolbar, Typography} from "@mui/material";
import BasicMenu from "../components/auxiliar/BasicMenu";


export const Theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "grey"
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
});

export const StyledToolbar = styled(Toolbar, {})({
  display: "flex",
  justifyContent: "space-between"
});

export const PageName = styled(Typography, {})({
  fontSize: "2rem",
  // alignContent: "center"
  // marginTop: "17%"
});

export const PageOptions = styled(BasicMenu, {})({
  alignContent: "end"
});