import { BrowserRouter, Switch, Route } from "react-router-dom";
import Chart from "./components/Chart";
import Coin from "./routes/Coin";
// import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Coins />
        </Route>
        <Route path="/:coinId">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
