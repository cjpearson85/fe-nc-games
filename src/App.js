import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import FullReview from "./components/FullReview";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import ReviewList from "./components/ReviewList";
import Sidebar from "./components/Sidebar";
import UserProfile from "./components/UserProfile";
import UsersList from "./components/UsersList";

function App() {
  const [loggedInAs, setLoggedInAs] = useState({
    username: 'jessjelly',
    name: 'Jess Jelly',
    avatar_url:
      'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="App">
      <Header
        loggedInAs={loggedInAs}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      {/* {sidebarOpen && (
        <Sidebar loggedInAs={loggedInAs} setLoggedInAs={setLoggedInAs} />
      )} */}
      <Sidebar
        loggedInAs={loggedInAs}
        setLoggedInAs={setLoggedInAs}
        sidebarOpen={sidebarOpen}
      />
      <main>
        <Switch>
          <Route exact path="/">
            <ReviewList loggedInAs={loggedInAs} searchOpen={searchOpen} />
          </Route>
          <Route exact path="/login">
            <Login setLoggedInAs={setLoggedInAs} />
          </Route>
          <Route exact path="/register">
            <Register setLoggedInAs={setLoggedInAs} />
          </Route>
          {/* <Route exact path="/profile">
            {loggedInAs.username ? <UserProfile loggedInAs={loggedInAs} setLoggedInAs={setLoggedInAs}/> : <Redirect to="/login"/>}
          </Route> */}
          <Route exact path="/users">
            <UsersList />
          </Route>
          <Route exact path="/users/:username">
            <UserProfile
              loggedInAs={loggedInAs}
              setLoggedInAs={setLoggedInAs}
            />
          </Route>
          <Route exact path="/categories/:category">
            <ReviewList loggedInAs={loggedInAs} searchOpen={searchOpen} />
          </Route>
          <Route exact path="/reviews/:review_id">
            <FullReview loggedInAs={loggedInAs} />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
      {/* <footer /> */}
    </div>
  )
}

export default App;
