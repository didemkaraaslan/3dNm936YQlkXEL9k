import React, { useState, useEffect } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Counter from "./components/counter/Counter";
import Bitcoin from "./components/bitcoin/Bitcoin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Counter />
        <Bitcoin />
      </Container>
    </div>
  );
};

export default App;
