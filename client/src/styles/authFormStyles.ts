import {CSSProperties} from "react";

export const authFormStyle: CSSProperties = {
  display: "grid",
  placeItems: "center",
  height: "75vh"
};

export const paperStyle: CSSProperties = {
  height: 260,
  width: 300,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: 50,
  borderRadius: 20
};

export const formInputStyle: CSSProperties = {
  marginTop: 10,
  marginBottom: 10,
  width: "80%"
};

export const errMessageStyle: CSSProperties = {
  width: "50%"
};
