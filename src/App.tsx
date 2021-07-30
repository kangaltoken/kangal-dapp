import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import Staking from "./pages/Staking";
import Bridge from "./pages/Bridge";

function App() {
  return (
    <div className="antialiased min-h-screen bg-mainbg">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/test">
            <div>Test page</div>
          </Route>
          <Route path="/bridge">
            <Bridge />
          </Route>
          <Route path="/">
            <Staking />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
