import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'

const Navbar = (props) => {
  return (
    <div className = 'footer flex flexJustifyContentCenter flexAlignItemsCenter flexDirectionColumn colorWhite'>
      <p>Personal Project: Hans Krohn</p>
      <a href = 'https://github.com/hk72'className = 'aTag pointer'><Icon name='github' /></a>
    </div>
  )
}

export default Navbar
