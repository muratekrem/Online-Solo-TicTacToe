import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import image from '../../kalemxox.png';


const Lobby = () => {
  const [len, setLen] = useState(1);
  const [rooms, setRooms] = useState([])
  const socket = io.connect("http://localhost:3001");
  useEffect(() => {
    socket.on("oyuncular", (len) => {
      setLen(len);
    });
    socket.emit("getRooms")

    socket.on("setRooms", _room => {
      console.log(_room)
      setRooms(_room)})

  }, []);
  useEffect(() => {
    console.log(len);
  }, [len]);

  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '5rem',
    height: '5rem',
  };

  return (
    
    <Container
    maxWidth="xl"
      style={{
        borderBlockColor: "goldenrod",
        display: "flex",
        justifyContent: "center", alignItems:"center", backgroundImage:`url(${image})`, backgroundSize:"15%" 
      }}
    >
      <Box
        style={{
          width: "602px",
          height: "76%",
          alignItems: "center",
          
        }}
        sx={{
          //Açık gri
          backgroundColor: "lightgray", ...commonStyles, border: 1 ,
          
        }}
      >
        <Box 
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "40px",
            borderBlockColor: "black",
            backgroundColor: "lightslategrey",
            
            //açık bi renk bul
          }}
          sx={{width:"600px",height:"40px",border:1}}
        >
          <Typography style={{ fontSize: "25px", marginLeft: "5px" }}>
            Room List
          </Typography>
          <Typography style={{ fontSize: "15px", marginRight: "5px" }}>
            {len} players inside the game
          </Typography>
        </Box>

        <Box
          style={{
            display: "flex",
            
            backgroundColor: "lightcoral",
            height: "35px",
            
          }} 
          sx={{border:1}}
        ><Box>
          <Typography style={{ fontSize: "20px",  }}>
            Room Name
          </Typography>
        </Box>
          
          <Box style ={{width:"280px" ,height:"35px", display:"flex", justifyContent:"space-around", 
        marginLeft:"80px" }}
        sx={{borderLeft:3 }}
          >
          <Typography style={{ fontSize: "20px",alignSelf: "flex-end"}}>
            Members
          </Typography>
          </Box>
          <Box>
          <Typography style={{ fontSize: "20px",alignSelf: "flex-end"}} >
            Mode
          </Typography>
          </Box>
          
        </Box>
        <Box
          style={{
            height: "470px",
            backgroundColor: "red",
            
          }}
        >
          <Box style={{ height: "438px"}} sx={{width:"600px",height:"40px",border:1}}>
            <Typography></Typography>
            {rooms.map(room => { 
            {/* //room component */}
              return <h3>{room.roomNamess} max: {room.maxMember} mode:{room.mode.onePlayer ? "Bilgisayara karşı" : "Oyunculara karşı" } </h3>})}
          </Box>
          <Box style={{ backgroundColor: "darkcyan" }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Button 
              sx={{
                backgroundColor: "darkkhaki", 
                "&:hover": { backgroundColor: "#51361a" },
              }}
                size="medium"
                color="inherit"
                variant="contained"
                onClick={() => {
                  
                }}
              >
                
                <Link to="/createroom" style={{color:"white"}}>Create Room</Link>
              </Button>
              <Tooltip
          title={
            <a
              href=" https://www.wikihow.com/Play-Tic-Tac-Toe"
              target="_blank"
              style={{ color: "white", fontSize: "15px" }}
            >
              "How to play Tic-Tac-Toe"{" "}
            </a>
          }
        >
          <InfoIcon style={{ marginTop: "5" }}></InfoIcon>
        </Tooltip>
              <Button
              sx={{
                backgroundColor: "darkkhaki",
                "&:hover": { backgroundColor: "#51361a" },
              }}
                size="medium"
                color="inherit"
                variant="contained"
                onClick={() => {
                  // setRoomState((prev) => ({
                  //   ...prev,
                  //   joinedMembers: roomState.joinedMembers + 1,
                  // }));
                  
                }}
                
              >
                
                <Link >Join Room</Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default Lobby;
