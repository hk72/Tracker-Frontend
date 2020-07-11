import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'

const Navbar = (props) => {

  const [menu, setMenu] = useState(false)

  let lastScrollTop = 0

  //function to make navbar appear / disappear
  window.addEventListener('scroll', () => {

    const navbar = document.getElementById('navbar')
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop

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
  return(
    <div className = "navbarSeperation">
      <nav id = 'navbar'>
        <div className = 'logoNav'>
          <img src = 'logo192.png' />
        </div>
        <Icon className = 'menuBar' onClick = { () => bringOutMenuBar()} name='bars' />
        <ul id = 'hUL' className = 'hiddenUL ul'>
          <li  onClick = { () => bringOutMenuBar()} className = 'hiddenLI pointer'><p>Projects</p></li>
          <li  onClick = { () => bringOutMenuBar()} className = 'hiddenLI pointer'><p>About</p></li>
          <li  onClick = { () => bringOutMenuBar()} className = 'hiddenLI pointer'><p>Education</p></li>
          <li  onClick = { () => bringOutMenuBar()} className = 'hiddenLI pointer'><p>Skills</p></li>
        </ul>
        <ul className = "ul flex">
          <li className = 'link pointer'><p>Projects</p></li>
          <li className = 'link pointer'><p>About</p></li>
          <li className = 'link pointer'><p>Education</p></li>
          <li className = 'link pointer'><p>Skills</p></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
