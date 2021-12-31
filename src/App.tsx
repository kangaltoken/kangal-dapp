import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import Staking from "./pages/Staking";
import Bridge from "./pages/Bridge";
import NFTDrop from "./pages/NFTDrop";
import AppBackground from "./components/AppBackground";

function App() {
  return (
    <div className={"antialiased min-h-screen relative"}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/bridge">
            <Bridge />
          </Route>
          <Route path="/nftdrop">
            <NFTDrop />
          </Route>
          <Route path="/">
            <Staking />
          </Route>
        </Switch>
        <AppBackground />
      </Router>
    </div>
  );
}

export default App;
