import { Route, Switch } from "react-router-dom";
import "./App.css";
import FullReview from "./components/FullReview";
import Nav from "./components/Nav";
import ReviewList from "./components/ReviewList";

function App() {
  return <div className="App">
    <Nav />
    <Switch>
      <Route exact path="/">
        <ReviewList />
      </Route>
      <Route exact path="/reviews/:category">
        <ReviewList />
      </Route>
      {/* <Route exact path="/reviews/:review_id">
        <FullReview />
      </Route> */}
    </Switch>
  </div>;
}

export default App;
