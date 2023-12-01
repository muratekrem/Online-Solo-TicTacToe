import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core/styles";
//import Menu from "@mui/material/Menu";
import {Link} from "react-router-dom";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  typography: {

  },
  iconButton: {

    backgroundColor: "#eb4034",
  },
  centerText: {
    textAlign: "center",
  },
}));

function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open,setOpen] = React.useState(false)
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
};
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };
  return (
    <Box style={{height:"9%"}}  >
      <AppBar >
        <Toolbar style={{justifyContent:"space-between",alignItems:"center"}}>
          <Button
            
            className={classes.iconButton}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ "&:hover": { color: "white", backgroundColor: "#1F4788" } }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            //              sx={{ mr: 2 }}
          >
            <MenuIcon style={{marginRight: 10}}/>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className={classes.typography}
            >
              Sayfalar
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              <MenuItem >
                <Button  color="inherit" >
                  <Link to ="/nickname">Login</Link>
                </Button>
              </MenuItem>
              {/* <MenuItem>
                <Button >
                  <Link to ="/tictactoe">TicTocToe</Link>
                </Button>
              </MenuItem> */}
            </MenuList>
          </Menu>
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
