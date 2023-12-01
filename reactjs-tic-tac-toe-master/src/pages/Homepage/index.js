import React, { useRef, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import image from "../../kalemxox.png";

const socket = io.connect("http://localhost:3001");
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  centerText: {
    alignSelf: "center",
    textAlign: "center",
  },
}));

const Homepage = () => {
  const [name, setName] = useState([]);
  console.log(name);

  
  function handleClick() {
    if(name){
      console.log(name);
      socket.emit("nicknames", name);
    }
  }
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundImage: `url(${image})`,
        backgroundSize: "15%",
      }}
    >
     
          <Box 
            style={{
              width:"20%",
              height:"10%",
              backgroundColor: "#c1e1ec",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "60px",
            }}
            //açık mavi renk
          >
            <Box style={{display:"flex",justifyContent:"center", paddingTop:"3px"}}>
              <label style={{ marginLeft: "15px" }}>Nickname: </label>

            <input
              labelText="nickname"
              formControlProps={{
                fullWidth: true,
              }}
              type="text"
              name="message"
              onChange={handleChange}
            />

            </Box>
            
            <Box display={"flex"} justifyContent={"center"} alignItems="center">
              <Button
                disabled={!name}
                // disabled={insideValue.current.value.length===0}
                style={{ backgroundColor: "#EFF8FF" }}
                onClick={handleClick}
              >
                <Link to="/lobby">Play Tic-Tac-Toe</Link>
              </Button>
            </Box>
          </Box>
        
        
      
    </Container>
  );
};

export default Homepage;
