import React, { useState } from 'react'
import './App.css'
import SignInOrUp from './Components/loginAndRegisterForm';
import Home from './Components/Home'
import Profile from './Components/Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserContextState from './Contexts/User/UserContextState'
import Navbar from './Components/Navbar';
import Search from './Components/Search';



function App() {

  return (

    <UserContextState>
      <Router>
        <Navbar />

        <Switch>
        
          <Route exact path={'/home'}>
            <Home />
          </Route>

          <Route exact path='/profile'>
            <Profile />
          </Route>


          <Route exact path='/search'>
            <Search />
          </Route>


          <Route exact path={['/', '/loginOrRegister']}>
            <SignInOrUp />
          </Route>



        </Switch>
      </Router>
    </UserContextState>

  );
}

export default App;
