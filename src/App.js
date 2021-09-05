import React, { useState } from 'react'
import './App.css'
import SignInOrUp from './loginAndRegister/Components/loginAndRegisterForm';
import Home from './loginAndRegister/Components/Home'
import Profile from './loginAndRegister/Components/Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserContextState from './Contexts/User/UserContextState'
import Navbar from './loginAndRegister/Components/Navbar';
import Search from './loginAndRegister/Components/Search';



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
