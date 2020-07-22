import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Endpage from "./Components/endpage";
import Model from "./Components/Model";
import PathfindingVisualizer from "./Components/PathfindingVisualizer/PathfindingVisualizer";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Model />
          </Route>
          <Route path="/algo">
            <PathfindingVisualizer />
          </Route>
          <Route path="/end">
            <Endpage />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
