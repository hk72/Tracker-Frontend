import React, {useEffect} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import history from '../../history'

const Cards = (props) => {

return (
  <div className = 'margin0auto marginBottom50px'>
      <Card>
        <Image src='/logo192.png' wrapped ui={false} />
        <Card.Content textAlign = 'center'>
          <Card.Header>{props.info.name}</Card.Header>
        </Card.Content>
      </Card>
  </div>
  )
}

export default Cards
