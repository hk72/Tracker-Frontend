import React from 'react'
import history from '../../history'

const NoMatch = (props) => {
  return (
    <div className = 'height100vhNoNav width80percent margin0auto flex'>
      <div className = 'flexDirectionRow width50percent'>
        <h1 className = 'fontSize80px paddingTopBottom50px'>Oops!</h1>
        <h2 className = 'paddingBottom20px'>We can't seem to find the page you're looking for.</h2>
        <h4 className = 'paddingTopBottom20px'>Error Code: 404</h4>
        <h2 className = 'paddingTopBottom20px'>Useful Links:</h2>
        <h4 onClick = { () => history.replace('/')} className = 'pointer greenFont paddingTopBottom5px'>Home</h4>
        <h4 onClick = { () => history.replace('/login')} className = 'pointer greenFont paddingTopBottom5px'>Login</h4>
        <h4 onClick = { () => history.replace('/signup')} className = 'pointer greenFont paddingTopBottom5px'>Signup</h4>
      </div>
      <div className = 'width50percent flex flexAlignItemsCenter flexJustifyContentCenter sadFaceDiv'>
        <div className = 'noMatchImg'>
          <img src = 'oops.png' alt = 'Opps!'/>
        </div>
      </div>
    </div>
  )
}

export default NoMatch
