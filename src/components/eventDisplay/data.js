import React, {useState, useEffect} from 'react'
import { Icon } from 'semantic-ui-react'
import history from '../../history'
import { connect } from 'react-redux'

const Data = (props) => {

  const handleDelete = () => {

    fetch(`https://thetechiechart.herokuapp.com/api/event/deleteData/${props.id}/${props.info.key}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === 'Data Deleted'){
        window.location.reload(false);
      }
      else if(res.message === "Internal Server Error"){
        alert('An Error has Occured. Please Try Again.')
      }
      else if(res.message === "Auth Failed"){
        history.replace('/login')
      }
    })
  }

  return(
    <div id = 'dataDiv' className = "paddingBottom20px">
      <h3 className = "colorWhite paddingLeft8Percent displayInline">{props.info.dataset}</h3>
      <div className = 'displayInline floatRight margin0 paddingRight10Percent fontSize25px colorWhite' >
        <Icon onClick = { () => handleDelete() } className = "margin0 width1emheight8em pointer wiggle" name = 'trash alternate' />
      </div>
      <div className = 'displayInline floatRight margin0 paddingRight30px fontSize25px colorWhite'>
        <Icon onClick = { () => {
          props.setData(props.info)
          history.push(`/user/${props.id}/updateData/${props.info.key}`)
        }}
        className = "margin0 width1emheight8em pointer wiggle" name = 'pencil' />
      </div>
      <p className = "colorWhite paddingLeft8Percent paddingBottom5px">{props.info.label}</p>
      <hr className = "margin0auto smallhr"></hr>
    </div>
  )
}

const mapDispatchToProps = {
  setData: data => {
    return { payload: data, type: 'SET_DATA',}
  }
}


export default connect(null, mapDispatchToProps)(Data)
