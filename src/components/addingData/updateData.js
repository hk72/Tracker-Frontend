import React, {useEffect} from 'react'
import history from '../../history'
import { Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const UpdateData = (props) => {

  useEffect(() => {
    fetch(`http://localhost:5000/api/event/getEvent/${props.match.params.id}/${props.match.params.dataID}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Successful"){
        props.setData(res)
      }
      else if(res.message === "Internal Server Error"){
        alert('An Error has Occured. Please Try Again.')
      }
      else if(res.message === "Auth Failed"){
        history.push('/login')
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

  const handleUpdate = (e) =>{
    e.preventDefault()

    let dataset = e.target['dataset'].value
    let label = e.target['label'].value

    if(e.target['label'].value === ''){
      label = props.data.label
    }
    if(e.target['dataset'].value === ''){
      dataset = props.data.dataset
    }

    fetch(`http://localhost:5000/api/event/updateDataPoint/${props.match.params.id}/${props.match.params.dataID}`,{
      method: 'PATCH',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        datasets: dataset,
        labels: label
      })})
      .then(res => res.json())
      .then(res => {
        if(res.message === "Data Updated"){
          history.push(`/user/event/${props.match.params.id}`)
        }
        else if(res.message === "Internal Server Error"){
          alert('An Error has Occured. Please Try Again.')
        }
        else if(res.message === "Auth Failed"){
          history.push('/login')
        }
      })
  }

  return(
    <div className = "height100vh flex flexAlignItemsCenter flexJustifyContentCenter backgroundColorGradiantGreen">
      <div className = "contentDiv">
        <div className = "accountCard">
          <h2 className = "paddingLeft5percent colorWhite">Update: {props.data.label}</h2>
          <hr className = "margin0auto"></hr>
          <form className = "textAlignCenter" onSubmit = {handleUpdate}>
            <div className = "marginTopBottom50px">
              <input className = "inputStyle colorWhite" type="number" placeholder={props.data.dataset} name = "dataset" />
            </div>
            <div className = "marginTopBottom50px">
              <input className = "inputStyle colorWhite" type="text" placeholder={props.data.label} name = "label" />
            </div>
            <div>
              <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated='fade'>
                <Button.Content visible>Update</Button.Content>
                <Button.Content hidden><Icon name='line graph' /></Button.Content>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = {
  setData: data => {
    return { payload: data, type: 'SET_DATA',}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateData)