import React, {useEffect} from 'react'
import history from '../../history'
import { Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const AddData = (props) => {

  useEffect(() => {
    fetch('http://localhost:5000/api/user/quickAuth', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Auth Failed"){
        history.replace('/login')
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

  const handleAdd = (e) =>{
    e.preventDefault()

    let dataset = e.target['dataset'].value
    let label = e.target['label'].value

    fetch(`http://localhost:5000/api/event/addData/${props.match.params.id}`,{
      method: 'POST',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        dataset: dataset,
        label: label
      })})
      .then(res => res.json())
      .then(res => {
        if(res.message === "Data Added"){
          history.push(`/user/event/${props.match.params.id}`)
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
    <div className = "height100vh flex flexAlignItemsCenter flexJustifyContentCenter backgroundColorGradiantGreen">
      <div className = "contentDiv">
        <div className = "accountCard">
          <h2 className = "paddingLeft5percent colorWhite">Add Data Point</h2>
          <hr className = "margin0auto"></hr>
          <form className = "textAlignCenter" onSubmit = {handleAdd}>
            <div className = "marginTopBottom50px">
              <input className = "inputStyle colorWhite" type="number" placeholder="Data Point" required = "required" name = "dataset" />
            </div>
            <div className = "marginTopBottom50px">
              <input className = "inputStyle colorWhite" type="text" placeholder="Data Label" required = "required" name = "label" />
            </div>
            <div>
              <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated='fade'>
                <Button.Content visible>Add Data Point</Button.Content>
                <Button.Content hidden><Icon name='line graph' /></Button.Content>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddData
