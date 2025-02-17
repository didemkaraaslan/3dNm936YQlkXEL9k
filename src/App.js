import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./components/counter/Counter";
import Bitcoin from "./components/bitcoin/Bitcoin";
import backgroundImage from "./background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: "90%",
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
      <Container className={classes.container}>
        <Counter />
        <Bitcoin />
      </Container>
    </div>
  );
};

export default App;
