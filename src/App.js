import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./App.css";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hour from "./components/counter/Hour";
import Minute from "./components/counter/Minute";
import Second from "./components/counter/Second";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const App = () => {
  const classes = useStyles();
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();

  useEffect(() => {
    startCountdown();
    return clearInterval(interval.current);
  }, []);

  const startCountdown = () => {
    const countdownDate = moment().add(10, "hours");

    interval = setInterval(() => {
      const now = moment();
      const distance = countdownDate - now;

      const hours = moment.duration(distance).hours();
      const minutes = moment.duration(distance).minutes();
      const seconds = moment.duration(distance).seconds();

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Hour hours={hours} />
        <Minute minutes={minutes} />
        <Second seconds={seconds} />
      </div>
    </Container>
  );
};

export default App;
