import React, {useState, useEffect} from 'react'
import { Icon } from 'semantic-ui-react'
import history from '../../history'

const Data = (props) => {

  return(
    <div className = "paddingBottom20px">
      <h3 className = "colorWhite paddingLeft8Percent displayInline">{props.info.dataset}</h3>
      <Icon onClick = { () => history.push('/')} className = 'displayInline floatRight margin0 paddingRight15Percent fontSize25px colorWhite' name = 'pencil' />
      <p className = "colorWhite paddingLeft8Percent paddingBottom5px">{props.info.label}</p>
      <hr className = "margin0auto smallhr"></hr>
    </div>
  )
}

export default Data
