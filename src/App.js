import React, {useEffect} from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import { connect } from 'react-redux'
import Navbar from './components/navbar/navbar'
import Account from './components/account/account'
import Login from './components/account/login'
import Signup from './components/account/signup'

import './App.css';

const App = (props) => {

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Successful"){
        props.setLoggedIn('true')
      }
      else{
        props.setLoggedIn('false')
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

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

const mapDispatchToProps = {
  setLoggedIn: data => {
    return { payload: data, type: 'SET_LOGGED_IN',}
  }
}

export default connect(null, mapDispatchToProps)(App);
