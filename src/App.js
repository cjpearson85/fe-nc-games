import { createContext, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import FullReview from './components/FullReview'
import Login from './components/Login'
import Header from './components/Header'
import Register from './components/Register'
import ReviewList from './components/ReviewList'
import UserProfile from './components/UserProfile'
import UsersList from './components/UsersList'

export const SidebarStatusContext = createContext()
export const AppUserContext = createContext()

function App() {
  const [loggedInAs, setLoggedInAs] = useState({
    username: 'jessjelly',
    name: 'Jess Jelly',
    avatar_url:
      'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  document.addEventListener('click', (event) => {
    if (
      event.target.closest('header') === null &&
      event.target.closest('nav') === null
    ) {
      setSidebarOpen(false)
    }
  })

  return (
    <div className="App">
      <AppUserContext.Provider value={{ loggedInAs, setLoggedInAs }}>
        <SidebarStatusContext.Provider
          value={{ sidebarOpen, setSidebarOpen, searchOpen, setSearchOpen }}
        >
          <Header />
          <Sidebar />
        </SidebarStatusContext.Provider>
        <main className={sidebarOpen ? 'blur' : ''}>
          <Switch>
            <Route exact path="/">
              <ReviewList />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            {/* <Route exact path="/profile">
              {loggedInAs.username ? <UserProfile loggedInAs={loggedInAs} setLoggedInAs={setLoggedInAs}/> : <Redirect to="/login"/>}
            </Route> */}
            <Route exact path="/users">
              <UsersList />
            </Route>
            <Route exact path="/users/:username">
              <UserProfile />
            </Route>
            <Route exact path="/categories/:category">
              <ReviewList />
            </Route>
            <Route exact path="/reviews/:review_id">
              <FullReview />
            </Route>
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
        </main>
      </AppUserContext.Provider>
    </div>
  )
}

export default App
