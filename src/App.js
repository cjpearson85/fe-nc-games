import { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import FullReview from "./components/FullReview";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import ReviewList from "./components/ReviewList";
import Sidebar from "./components/Sidebar";
import UserProfile from "./components/UserProfile";
import UsersList from "./components/UsersList";

function App() {
  // const [loggedInAs, setLoggedInAs] = useState({
  //   username: 'jessjelly',
  //   name: 'Jess Jelly',
  //   avatar_url:
  //     'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg'
  // });
  const [loggedInAs, setLoggedInAs] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const param = pathname.split("/").pop();

  return (
    <div className="App">
      <Nav loggedInAs={loggedInAs} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && <Sidebar loggedInAs={loggedInAs} setLoggedInAs={setLoggedInAs}/>}
      <Switch >
        <Route exact path="/">
          <ReviewList />
        </Route>
        <Route exact path="/login">
          <Login setLoggedInAs={setLoggedInAs} />
        </Route>
        <Route exact path="/register">
          <Register setLoggedInAs={setLoggedInAs} />
        </Route>
        <Route exact path="/profile">
          <UserProfile user={loggedInAs} setLoggedInAs={setLoggedInAs}/>
        </Route>
        <Route exact path="/users">
          <UsersList />
        </Route>
        {Object.is(parseInt(param), NaN) ? (
          <Route exact path="/reviews/:category">
            <ReviewList />
          </Route>
        ) : (
          <Route exact path="/reviews/:review_id">
            <FullReview loggedInAs={loggedInAs}/>
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
