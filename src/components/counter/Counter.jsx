import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Hour from "./Hour";
import Minute from "./Minute";
import Second from "./Second";
import { INCREASE, DECREASE } from "../../actions";

const useStyles = makeStyles((theme) => ({
  timer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(8),
    width: "470px",
    border: "1px solid #fff",
    borderRadius: 4,
    padding: theme.spacing(6),
    fontSize: 22,
    color: "#fff",
  },
}));

const Counter = () => {
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
    <div className={classes.timer}>
      <Hour hours={hours} handleUpdate={handleUpdate} />
      <span>:</span>
      <Minute minutes={minutes} handleUpdate={handleUpdate} />
      <span>:</span>
      <Second seconds={seconds} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Counter;
