import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'
import history from '../../history'
import { connect } from 'react-redux'

const Navbar = (props) => {

  const [menu, setMenu] = useState(false)

  let lastScrollTop = 0

  //function to make navbar appear / disappear
  window.addEventListener('scroll', () => {

    const navbar = document.getElementById('navbar')
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if(navbar !==null){
      if(menu){
        navbar.style.boxShadow = 'none';
        navbar.style.top = '0px';
      }
      else if(scrollTop === 0){
        navbar.style.boxShadow = 'none';
        navbar.style.top = '0px';
      }
      else if(scrollTop > lastScrollTop){
        navbar.style.top = '-80px';
        navbar.style.boxShadow = 'none';
      }
      else{
        navbar.style.top = '0px';
        navbar.style.boxShadow = '0 3px 20px black';
      }
    }

    lastScrollTop = scrollTop

  })

  const bringOutMenuBar = () => {

    const hUL = document.getElementById('hUL')
    const body = document.getElementById('landing')

    if(menu ===  false){
      hUL.style.left = '0%'
      setMenu(true)
    }
    else if (menu === true) {
      hUL.style.left = '-100%'
      setMenu(false)
    }

  }

  const handleLogout = () => {
    fetch('http://localhost:5000/api/user/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Log Out Successful"){
        history.replace('/')
        props.setLoggedIn('false')
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }


  return(
    <div className = "navbarSeperation">
      <nav id = 'navbar'>
        <div className = 'logoNav'>
          <img src = '/logo192.png' alt = 'logo' />
        </div>
        <Icon className = 'menuBar' onClick = { () => bringOutMenuBar()} name='bars' />
        <ul id = 'hUL' className = 'hiddenUL ul'>
            {
              props.isLoggedIn
              ?
                <li  onClick = { () => bringOutMenuBar()} className = 'hiddenLI pointer'>
                  <p onClick = { () => {history.push('/user/dashboard')}}>Dashboard</p>
                </li>
              :
                null
            }
            {
              props.isLoggedIn
              ?
                <li  onClick = { () => bringOutMenuBar()} className = 'hiddenLI pointer'>
                  <p onClick = { () => {history.push('/user')}}>Profile</p>
                </li>
              :
                null
            }
          <li  onClick = { () => bringOutMenuBar()} className = ' hiddenLI pointer'>
            {
              props.isLoggedIn
              ?
                <p onClick = { () => handleLogout()}>Logout</p>
              :
                <p onClick = { () => {history.push('/login')}}>Login</p>
            }
          </li>
        </ul>
        <ul className = "ul flex">
            {
              props.isLoggedIn
              ?
                <li className = 'link pointer'>
                  <p onClick = { () => {history.push('/user/dashboard')}}>Dashboard</p>
                </li>
              :
                null
            }
            {
              props.isLoggedIn
              ?
                <li className = 'link pointer'>
                  <p onClick = { () => {history.push('/user')}}>Profile</p>
                </li>
              :
                null
            }
          <li className = 'link pointer'>
            {
              props.isLoggedIn
              ?
                <p onClick = { () => handleLogout()}>Logout</p>
              :
                <p onClick = { () => {history.push('/login')}}>Login</p>
            }
          </li>
        </ul>
      </nav>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
})

const mapDispatchToProps = {
  setLoggedIn: data => {
    return { payload: data, type: 'SET_LOGGED_IN',}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
