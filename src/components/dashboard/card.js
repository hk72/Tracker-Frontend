import React, {useEffect} from 'react'
import { Card, Image } from 'semantic-ui-react'
import history from '../../history'
import { connect } from 'react-redux'

const Cards = (props) => {

return (
  <div className = 'cardMarginBottom'>
      <Card link onClick = {() => history.push(`/user/event/${props.info._id}`)}>
        <Image src='/logo192.png' wrapped ui={false} />
        <Card.Content textAlign = 'center'>
          <Card.Header>{props.info.name}</Card.Header>
        </Card.Content>
      </Card>
  </div>
  )
}


export default Cards
