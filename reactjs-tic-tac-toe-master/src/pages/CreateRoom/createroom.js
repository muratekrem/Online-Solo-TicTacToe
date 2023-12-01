import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import image from "../../xoxox.jpg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const CreateRoom = () => {
  const socket = io.connect("http://localhost:3001");

  const [choise, setChoise] = useState({
    onePlayer: false,
    twoPlayer: false,
  });
  const [name, setName] = useState();

  const [count, setCount] = React.useState("");
  const handleChange = (event) => {
    setCount(event.target.value);
  };
  const handleChange2 = (event) => {
    setName(event.target.value);
  };
  console.log(name);
  console.log(count);
  console.log(choise);

  return (
    <Container
    maxWidth="xl"
      style={{width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "15%"
      }}
    >
      <Box
        //açık gri renk
        //shadow ver(shadowu labelin üstüne alma )
        style={{
          height: "200px",
          width: "500px",
          backgroundColor: "#f9f9f9",
          borderRadius: "20px",
        }}
      >
        <Box>
          <Box
            style={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "space-evenly",
              backgroundColor: "#e0e0e0",
            }}
          >
            <Box>
              <label style={{ fontWeight: "bold" }}>Name Room: </label>
              <input
                type="text"
                style={{ marginLeft: "4px" }}
                //color:"#c7c7c7" bu rengi input a koy
                onChange={handleChange2}
              ></input>
            </Box>
            <Box style={{ display: "flex" }}>
              <label style={{ alignItems: "center" }}>Max Player: </label>
              <FormControl>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={count}
                  onChange={handleChange}
                  style={{ height: "30px" }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* <Button
            style={{ height: "15px", marginTop: "3px" }}
            onClick={() => {}}
          >
            Create Room
          </Button> */}
          </Box>
          <Box
            style={{
              height: "100px",
              width: "500px",

              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <ButtonGroup aria-label="Basic outlined example" size="small">
              <Button
                disabled={choise.onePlayer}
                variant="contained"
                siz
                sx={{
                  backgroundColor: "#474747",
                  "&:hover": { backgroundColor: "#D1D1D1" },
                  //on hover large
                }}
                onClick={() => {
                  setChoise((prev) => ({
                    ...prev,
                    onePlayer: true,
                    twoPlayer: false,
                  }));
                }}
              >
                Against Computer
              </Button>
              <Button
                disabled={choise.twoPlayer}
                variant="contained"
                sx={{
                  backgroundColor: "#474747",
                  "&:hover": { backgroundColor: "#D1D1D1" },
                  //onhover large
                }}
                onClick={() => {
                  setChoise((prev) => ({
                    ...prev,
                    twoPlayer: true,
                    onePlayer: false,
                  }));
                }}
              >
                2 Player
              </Button>
            </ButtonGroup>
            <Box>
              <Button
                size="small"
                color="inherit"
                variant="contained"
                onClick={() => {
                  //socket ile count gidicek , choise gidicek , name gidicek
                  socket.emit("odaİsmi", {name,count,choise});
                  
                }}
                disabled={!name || !count || (choise.onePlayer==choise.twoPlayer)}
              ><Link to="/tictactoe" style={{color:"inherit"}}>Create Room</Link>

                
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateRoom;
