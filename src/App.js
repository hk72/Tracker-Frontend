import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import Navbar from './components/navbar/navbar'
import Account from './components/account/account'
import Login from './components/account/login'
import Signup from './components/account/signup'

import './App.css';

function App() {
  return (
    <div>
      <Router history = {history} >
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/signup' component = {Signup}/>
        <Route path ='/user'>
          <Navbar/>
          <Route exact path = '/user' component = {Account}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
