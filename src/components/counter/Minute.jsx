import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons/";
import { indigo } from "@material-ui/core/colors";
import { INCREASE, DECREASE } from "../../actions";
import { MINUTES } from "../../types";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    "&:hover": {
      backgroundColor: indigo[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const Minute = ({ minutes, handleUpdate }) => {
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
        <ColorButton
          variant="text"
          size="small"
          onClick={() => handleUpdate(INCREASE, MINUTES)}
        >
          <Add />
        </ColorButton>
        <ColorButton
          variant="text"
          size="small"
          onClick={() => handleUpdate(DECREASE, MINUTES)}
        >
          <Remove />
        </ColorButton>
      </ButtonGroup>
    </div>
  );
};

export default Minute;
