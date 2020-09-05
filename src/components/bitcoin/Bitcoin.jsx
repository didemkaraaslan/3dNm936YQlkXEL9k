import React, { useState, useEffect, useRef } from "react";
import { loadCSS } from "fg-loadcss";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Icon,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 22,
  },
}));

const Bitcoin = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  let interval = useRef();

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  useEffect(() => {
    fetchBitcoinPrices();
    setBitcoinInterval();

    return clearInterval(interval.current);
  }, []);

  const fetchBitcoinPrices = () => {
    axios.get("http://api.coindesk.com/v1/bpi/currentprice.json").then(
      ({ data }) => {
        setData(data.bpi);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const setBitcoinInterval = () => {
    interval = setInterval(() => {
      fetchBitcoinPrices();
    }, 60 * 1000); // Every minute the prices get updated ( as the api documentation says )
  };

  const { USD, GBP, EUR } = data;

  return (
    <Grid container justify="center" spacing={6} className={classes.root}>
      <Grid item>
        <Card>
          <CardHeader
            avatar={<Icon className="fas fa-dollar-sign" color="primary" />}
            title={
              <Typography variant="h5" component="h2">
                {USD && USD.rate}
              </Typography>
            }
            subheader={USD && USD.description}
          />
          <CardContent>USD</CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardHeader
            avatar={<Icon className="fas fa-pound-sign" color="primary" />}
            title={
              <Typography variant="h5" component="h2">
                {GBP && GBP.rate}
              </Typography>
            }
            subheader={GBP && GBP.description}
          />
          <CardContent>GBP</CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardHeader
            avatar={<Icon className="fas fa-euro-sign" color="primary" />}
            title={
              <Typography variant="h5" component="h2">
                {EUR && EUR.rate}
              </Typography>
            }
            subheader={EUR && EUR.description}
          />
          <CardContent>EUR</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Bitcoin;
