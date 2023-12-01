import React from "react";
import Switch from "@mui/material/Switch";
import { Typography } from "@material-ui/core";

const BasicSwitch = (props) => {
  const { disabled } = props;
  const handleChange = (event) => {
    props.setSelectedChar(event.target.checked ? "O" : "X");
  };

  return (
    <div style={{ display: "flex" }}>
      <Typography>X</Typography>
      <Switch
        disabled={disabled}
        checked={props.selectedChar === "O"}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        style={{ alignSelf: "center", justifyContent: "center" }}
      />
      <Typography>O</Typography>
    </div>
  );
};

export default BasicSwitch;
