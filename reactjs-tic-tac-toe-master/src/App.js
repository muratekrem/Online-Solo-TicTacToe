import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import TicTacToe from "./pages/TicTacToe";
import Grid from "@material-ui/core/Grid";
import Lobby from "./pages/Lobby/screen";
import CreateRoom from "./pages/CreateRoom/createroom";
import { Home } from "@mui/icons-material";

function App() {
  return (
    <Grid container className={"App"} style={{ height: "100vh" }}>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Homepage} />
        <Route path={"/home"} component={Homepage} />
        <Route path={"/tictactoe"} component={TicTacToe} />
        <Route path={"/lobby"} component={Lobby} />
        <Route path={"/createroom"} component={CreateRoom} />
        <Route path={"/nickname"} component={Homepage}/>
      </Switch>
    </Grid>
  );
}

export default App;
