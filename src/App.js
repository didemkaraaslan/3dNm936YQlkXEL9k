import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./App.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hour from "./components/counter/Hour";
import Minute from "./components/counter/Minute";
import Second from "./components/counter/Second";
import { grey } from "@material-ui/core/colors";
import { INCREASE, DECREASE } from "./actions";
import { HOURS, MINUTES, SECONDS } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    background: grey[100],
    height: "100vh",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "470px",
    border: "1px solid #DA22FF",
    borderRadius: 4,
    padding: theme.spacing(3),
    fontSize: 17,
    color: "#fff",
    opacity: "90%",
    background: "#DA22FF" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #9733EE, #DA22FF)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #9733EE, #DA22FF)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
}));

const App = () => {
  const classes = useStyles();
  const [date, setDate] = useState(() => {
    return moment().add(10, "hours");
  });
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();

  useEffect(() => {
    startCountdown();
    return clearInterval(interval.current);
  }, [date]);

  const startCountdown = () => {
    interval = setInterval(() => {
      const now = moment();
      const distance = date - now;

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

  const handleUpdate = (action, type) => {
    let newDate;
    switch (action) {
      case INCREASE:
        console.log("hl");
        newDate = date.add(1, type);
        setDate(newDate);
        return;
      case DECREASE:
        newDate = date.subtract(1, type);
        setDate(newDate);
        return;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.container}>
        <Grid item>
          <div className={classes.timer}>
            <Hour hours={hours} handleUpdate={handleUpdate} />
            <span>:</span>
            <Minute minutes={minutes} handleUpdate={handleUpdate} />
            <span>:</span>
            <Second seconds={seconds} handleUpdate={handleUpdate} />
          </div>
        </Grid>
        <Grid item>
          <p>dsa</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
