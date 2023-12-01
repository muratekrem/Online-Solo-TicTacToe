import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { position, random } from "../../positions";
import AppSwitch from "../../AppSwitch";
import io from "socket.io-client";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import AlarmIcon from "@mui/icons-material/Alarm";

const InitialState = {
  board: {
    "0,0": null,
    "0,1": null,
    "0,2": null,
    "1,0": null,
    "1,1": null,
    "1,2": null,
    "2,0": null,
    "2,1": null,
    "2,2": null,
  },
  gameStarted: false,
  gameEnded: false,
  winner: null,
  playerChar: "X",
  currentChar: "X",
  compChar: "O",
  draw: false,
  onePlayer: false,
  twoPlayer: false,
  countdown: 8,
};
const socket = io.connect("http://localhost:3001");
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
}));

const Homepage = () => {
  const [game, setGame] = useState(InitialState);
  const [roomState, setRoomState] = useState({
    rooms: [],
    roomInput: "",
    currentRoom: "",
    canStart:false,
    
  });
  const [socketValue, setSocketValue] = useState();
  const [timeouts, setTimeouts] = useState([]);
  useEffect(() => {
    socket.on("joinSuccessful", (roomName) => {
      console.log("join success!", roomName);
      setRoomState((prev) => ({ ...prev, currentRoom: roomName }));
    });
    // socket.on("oyuncuKatıldı", (katıldı) => {
    //   setRoomState((prev) => ({
    //     ...prev,
    //     joinedMembers: katıldı,
    //   }));
    // });
    socket.on("roomList", (rooms) => {
      setRoomState((prev) => ({ ...prev, rooms }));
    });
    socket.on("yeniveri", (place, letter) => {
      setSocketValue({ place, letter });
    });
    socket.on("yenile", () => {
      setTimeout(() => {
        setGame({ ...InitialState, gameEnded: true });
      }, 2000);
    });
    socket.on("oyuncular",(nicknames)=>{
      console.log(nicknames);
    })
    // socket.on("Katıldı", (name) => {
    //   setName(name);
    //   console.log(name);
    // });
  }, []);
  // console.log(socket);
  useEffect(() => {
    if (socketValue) {
      setSocketValue(null);
      const { place, letter } = socketValue;
      setGame((prev) => ({
        ...prev,
        board: { ...prev.board, [place]: letter },
      }));
      switchChar();
    }
  }, [socketValue]);

  //player char X ise comp O yazdırsın, aşağıdaki gridlerin içine player char X ise bu yazdırılsın
  //player char O ise comp X yazdırsın, aşağıdaki gridlerin içine player char O ise bu yazdırılsın

  const switchChar = () => {
    setGame((prev) => ({
      ...prev,
      currentChar: prev.currentChar === "X" ? "O" : "X",
    }));
    //setGame(prev=>({...prev,compChar: prev.compChar === "O" ? "X" : "O"}))
    // setTimeout(()=>alert("Your Turn"),2000)
  };
  // player char o ise comp char x olucak , değilse comp char o olucak

  //const [buttonText, setButtonText] = useState('your turn');

  const classes = useStyles();
  const button = (
    <ButtonGroup
      variant="contained"
      aria-label="Basic outlined example"
      style={{ marginTop: 9 }}
    >
      <Button
        disabled={
          (game.gameStarted) ||
          (game.onePlayer === game.twoPlayer) 
          // || (roomState.currentRoom === "" && game.twoPlayer) Odalar oluşturulduğunda burayı aktif et
        }
        onClick={() => {
          setGame({ ...game, gameStarted: true, gameEnded: false });
        }}
        sx={{
          backgroundColor: "black",
          "&:hover": { backgroundColor: "blue" },
        }}
      >
        Start Game
      </Button>
      <Button
        disabled={!game.gameStarted}
        onClick={() => {
          alert("You're surrendering huh :)");

          setGame(InitialState);
          setGame((game) => ({
            ...game,
            gameEnded: true,
          }));
        }}
        sx={{
          backgroundColor: "black",
          "&:hover": { backgroundColor: "blue" },
        }}
      >
        Resign
      </Button>
    </ButtonGroup>
  );

  const elements = Object.entries(game.board).map(([keys]) => {
    
    return (
      <Grid
        key={keys}
        onClick={
          () => {
            //  if(game.board[values] !== gam){
            //     change.
            //  }
            if (
              !(
                game.board[keys] == null &&
                game.gameStarted &&
                game.playerChar === game.currentChar
              )
            )
              return;
            if (game.twoPlayer) {
              socket.emit("placement", [keys], game.currentChar);
            } else {
              setGame((prev) => ({
                ...prev,
                board: { ...prev.board, [keys]: game.playerChar },
              }));

              // if (game.onePlayer) {
              switchChar();
            }
            if (game.currentChar === game.playerChar) {
              timeouts.forEach((t) => {
                clearTimeout(t);
              });
            }
          }
          //  }
        }
        //value'su null olan rastgele bir grid'e , 0.5 ile 2.0 saniye arasında compCharı ı girmek

        item
        xs={4}
      >
        <Box className={classes.paper} sx={{ border: 1 }}>
          <Typography>{game.board[keys]}</Typography>
        </Box>
      </Grid>
    );
  });

  useEffect(() => {
    const computerClickFunction = () => {
      if (!game.gameStarted || game.gameEnded) return;
      if (game.currentChar !== game.compChar) return;
      if (game.draw || game.winner) return;
      // if(win) return;
      // console.log(game);
      // bütün grid'ler doluysa ve kazanma durumu yoksa draw
      // !game.gameEnded && game.gameStarted && !game.draw && !game.winner

      if (
        !game.gameEnded &&
        game.gameStarted &&
        !game.draw &&
        !game.winner &&
        !game.twoPlayer
      ) {
        setTimeout(() => {
          setGame((prev) => ({
            ...prev,
            board: {
              ...prev.board,
              [random(position(game.board))]: game.compChar,
            },
            currentChar: prev.currentChar === "X" ? "O" : "X",
          }));
        }, 2000);
      }
    };
    const checkWinFunction = () => {
      const winConditions = [
        ["0,0", "0,1", "0,2"],
        ["1,0", "1,1", "1,2"],
        ["2,0", "2,1", "2,2"],
        ["0,0", "1,0", "2,0"],
        ["0,1", "1,1", "2,1"],
        ["0,2", "1,2", "2,2"],
        ["0,2", "1,1", "2,0"],
        ["0,0", "1,1", "2,2"],
      ];

      for (let i = 0; i < winConditions.length; i++) {
        // console.log("12");
        // console.log(winConditions[i]);
        // console.log("21");
        let [a, b, c] = winConditions[i];
        // if(game.winner){return}
        if (
          game.board[a] !== null &&
          game.board[a] === game.board[b] &&
          game.board[a] === game.board[c]
        ) {
          console.log("Oyun baştan başlatılıyor");
          
          if (game.currentChar === "X") {
            console.log("O PLAYER WİN");
            setGame((game) => ({
              ...game,
              gameEnded: true,
              gameStarted: false,
              draw: false,
              winner: "O",
            }));

            setTimeout(() => {
              setGame(InitialState);
            }, 3000);
            return true;
          }
          if (game.currentChar === "O") {
            console.log("X PLAYER WİN");
            setGame((game) => ({
              ...game,
              gameEnded: true,
              gameStarted: false,
              draw: false,
              winner: "X",
            }));
            setTimeout(() => {
              setGame(InitialState);
            }, 3000);
            return true;
          }

          break;
        }
      } //Beraberlik
      if (position(game.board).length === 0) {
        setGame((prev) => ({
          ...prev,
          gameEnded: true,
          gameStarted: false,
          draw: true,
          winner: "none",
        }));
        console.log(game.winner);
        setTimeout(() => {
          setGame(InitialState);
        }, 3000);
        return true;
      }
    };

    if (!game.gameStarted || game.gameEnded) return;
    const isGameOver = checkWinFunction();
    if (!isGameOver) computerClickFunction();
  }, [game.board, game.gameEnded, game.gameStarted]);
  const setPlayersChar = (char) => {
    setGame((prev) => ({
      ...prev,
      playerChar: char,
      compChar: char === "O" ? "X" : "O",
    }));
  };

  useEffect(() => {
    if (game.currentChar === game.playerChar) {
      countdown();
    }
  }, [game.board]);

  useEffect(() => {
    timeouts.forEach((t) => {
      clearTimeout(t);
    });
  }, [game.gameEnded]);
//member sayısı değiştiğinde çalışacak ve emit edicek bi useEffect oluştur.
  useEffect(() => {
    if (game.countdown === 0) {
      socket.emit("sure", "sure doldu");
    }
  }, [game.countdown]);

  // console.log(roomState.joinedMembers);

  const sendInfo = () => {
    // socket.emit("sendName", name);
    socket.emit("sendRoom", roomState.roomInput);
  };
  
  const countdown = () => {
    if (
      game.gameStarted &&
      !game.gameEnded &&
      game.currentChar === game.playerChar
    ) {
      for (let i = 8; i >= 0; i--) {
        const counterTimeout = setTimeout(() => {
          setGame((prev) => ({ ...prev, countdown: i }));
        }, (8 - i) * 1000);
        setTimeouts((prev) => [...prev, counterTimeout]);
        
        // if(i===0) {
        //   setGame((prev) => ({
        //     ...prev,
        //     board: {
        //       ...prev.board,
        //       [random(position(game.board))]: game.currentChar,
        //     },
        //     currentChar: prev.currentChar === "X" ? "O" : "X",
        //   }));
        // }
      }
      

      // 1 saniye sonra yani 1000ms sonra 7 yazacak
      // 2 saniye sonra yani 2000ms sonra 6 yazacak
      // (8-i) * 1000
    }
  };
  console.log("roomState:", roomState);
  return (
    <Container style={{ marginTop: 80 }}>
      <Grid container spacing={0}>
        {elements}
        {/* random grid'e(value değeri null olanlardan) , 0.5 ile 2.0 saniye arasında compChar ne ise onu yerleştir  */}
      </Grid>
      <Box sx={{ justifyContent: "space-between", display: "flex" , backgroundColor:"red"}}>
        <Box>
          {button}
          

          <Switch
            defaultValue={false}
            checked={game.currentChar === game.playerChar}
            // onChange={(event) => {
            //   setGame({ ...game, playerStartsFirst: event.target.checked });
            // }}
            disabled
          />
          {game.currentChar === game.playerChar ? "Your Turn" : "Comp Turn"}
        </Box>
        <Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography style={{ fontSize: "20px" }}>
              You must make your move in {game.countdown} seconds.
            </Typography>
            <AlarmIcon style={{ marginTop: "5", marginLeft: "4" }}></AlarmIcon>
          </Box>
          <Typography
            style={{
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Or the game will restart.
          </Typography>
        </Box>

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
      </Box>
      {/* <input
        type="text"
        placeholder="Nickname"
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></input> */}
      {/* <input
        type="text"
        placeholder="Choose 2 Player for creating room"
        disabled={!game.twoPlayer}
        onChange={(event) => {
          setRoomState((prev) => ({ ...prev, roomInput: event.target.value }));
          // setRoom(event.target.value);
        }}
      ></input>
      <Button
        size="small"
        color="inherit"
        variant="contained"
        onClick={() => {
          if (roomState.roomInput === "") return;
          sendInfo();
          // setRoomState((prev) => ({
          //   ...prev,
          //   joinedMembers: roomState.joinedMembers + 1,
          // }));
          // socket.emit("memberJoined", roomState.joinedMembers);
        }}
      >
        Create Room
      </Button>
      <div style={{ fontSize: "12px", fontWeight: "bold" }}>
        Share the Room ID with someone you want to play with
      </div> */}
      <Box display={"flex"} justifyContent={"center"}>
        {/* <FormControl
          sx={{ minWidth: 100 }}
          size="small"
          style={{ marginTop: "4px" }}
        >
          <InputLabel id="demo-select-small">Rooms</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={roomState.currentRoom}
            label="Rooms"
          >
            {roomState.rooms.map((r) => {
              return (
                <MenuItem
                  disabled={!game.twoPlayer}
                  value={r}
                  onClick={() => {
                    setRoomState((prev) => ({ ...prev, currentRoom: r }));
                  }}
                >
                  {r} room has  member
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          disabled={!game.twoPlayer }
          onClick={() => {
            // setRoomState((prev) => ({
            //   ...prev,
            //   joinedMembers: roomState.joinedMembers + 1,
            // }));
            socket.emit("joinRequest", roomState.currentRoom);
          }}
          style={{ marginRight: "240px", color: "slateblue" }}
        >
          Join Room
        </Button> */}
        <AppSwitch
          disabled={game.gameStarted}
          //game.gameEnded true olduğunda disabled = false olsun
          selectedChar={game.playerChar}
          setSelectedChar={setPlayersChar}
        />
      </Box>

      <ButtonGroup
        aria-label="Basic outlined example"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          disabled={game.gameStarted || game.onePlayer}
          onClick={() => {
            setGame((game) => ({
              ...game,
              onePlayer: true,
              twoPlayer: false,
            }));
          }}
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "blue" },
          }}
        >
          Against Computer
        </Button>
        <Button
          variant="contained"
          disabled={game.gameStarted || game.twoPlayer}
          onClick={() => {
            setGame((game) => ({
              ...game,
              twoPlayer: true,
              onePlayer: false,
            }));
          }}
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "blue" },
          }}
        >
          2 Player
        </Button> 
       </ButtonGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
      Always X starts the game
      </div>
    </Container>
  );
};
export default Homepage;
