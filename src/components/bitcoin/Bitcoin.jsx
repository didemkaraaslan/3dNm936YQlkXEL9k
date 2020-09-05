import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";
import { loadCSS } from "fg-loadcss";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Icon,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
  },
  card: {
    minWidth: 300,
    minHeight: 150,
  },
  update: {
    background: "#ad5389" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #3c1053, #ad5389)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #3c1053, #ad5389)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    transition: "background 1s ease-out",
  },
}));

const Bitcoin = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [updated, setUpdated] = useState(false);
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
        setTimeout(() => {
          setUpdated(false);
        }, 1000);

        setData(data.bpi);
      },
      (error) => {
        console.error(error);
        setTimeout(() => {
          setUpdated(false);
        }, 1000); // Add 1 sec delay so that user can see  background transition
      }
    );
  };

  const setBitcoinInterval = () => {
    interval = setInterval(() => {
      setUpdated(true);
      fetchBitcoinPrices();
    }, 60 * 1000); // Every minute the prices get updated ( as the api documentation says )
  };

  const cardClasses = cx({
    [classes.card]: true,
    [classes.update]: updated,
  });

  const { USD, GBP, EUR } = data;

  return (
    <Grid container justify="center" spacing={4} className={classes.root}>
      <Grid item>
        <Card className={cardClasses}>
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
        <Card className={cardClasses}>
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
        <Card className={cardClasses}>
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
