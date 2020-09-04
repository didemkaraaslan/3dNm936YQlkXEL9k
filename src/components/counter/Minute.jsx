import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons/";
import { purple } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const Minute = ({ minutes, handleMinutesUpdate }) => {
  const classes = useStyles();

  return (
    <div>
      <p>
        {minutes} <small>Minutes</small>
      </p>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="contained primary button group"
        className={classes.margin}
      >
        <ColorButton variant="text" size="small">
          <Add />
        </ColorButton>
        <ColorButton variant="text" size="small">
          <Remove />
        </ColorButton>
      </ButtonGroup>
    </div>
  );
};

export default Minute;
