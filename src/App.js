import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ReviewList from "./components/ReviewList";

function App() {
  return <div className="App">
    <Nav />
    <Switch>
      <Route path="/">
        <ReviewList />
      </Route>
    </Switch>
  </div>;
}

export default App;
