import React, {useState, useEffect} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import history from '../../history'

const UpdateEvent = (props) => {

  const [errors, setErrors] = useState([])

  useEffect(() => {

    fetch('https://thetechiechart.herokuapp.com/api/user/quickAuth', {
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

    document.querySelectorAll(".drop-zone__input").forEach(inputElement => {

      const dropZoneElement = inputElement.closest('.drop-zone')

      dropZoneElement.addEventListener('click', e => {
        inputElement.click();
      })

      inputElement.addEventListener("change", e => {
        if(inputElement.files.length){
          updateThumbnail(dropZoneElement, inputElement.files[0])
        }
      })

      dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault()
        dropZoneElement.classList.add("drop-zone--over")
      })

      const arr = ["dragleave", "dragend"]

      arr.forEach(type => {
        dropZoneElement.addEventListener(type, e => {
          dropZoneElement.classList.remove('drop-zone--over')
        })
      })

      dropZoneElement.addEventListener("drop", e => {
        e.preventDefault()

        if(e.dataTransfer.files.length){
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0] )
        }

        dropZoneElement.classList.remove('drop-zone--over')
      })
    })
  }, [])

  const updateThumbnail = (dropZoneElement, file) => {
    let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb')

    if(dropZoneElement.querySelector('.drop-zone__prompt')){
      dropZoneElement.querySelector('.drop-zone__prompt').remove()
    }

    if(!thumbnailElement){
      thumbnailElement = document.createElement('div')
      thumbnailElement.classList.add('drop-zone__thumb')
      dropZoneElement.appendChild(thumbnailElement)
    }

    if(file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')){
      const reader = new FileReader()

      thumbnailElement.dataset.label = file.name

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`
      }
    }
    else{
      thumbnailElement.dataset.label = 'Invalid File Type. Please use .jpeg or .png'
      thumbnailElement.style.backgroundImage = null
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    const name = e.target['name'].value
    const eventImage = document.querySelector(".drop-zone__input")

    let data = new FormData()
    data.append('eventImage', eventImage.files[0])
    data.append('name', name)

    fetch(`https://thetechiechart.herokuapp.com/api/event/updateEvent/${props.event._id}`,{
      method: 'PATCH',
      credentials: 'include',
      body: data
    })
      .then(res => res.json())
      .then(res => {
        if(res.message === "Auth Failed"){
          history.replace('/login')
        }
        else if(res.message === "Internal Server Error"){
          alert('An Error has Occured. Please Try Again.')
        }
        else if(res.message === "Event Updated"){
          history.push('/user/dashboard')
        }
        else if(res.message === "Event Validation Failed"){
          setErrors([
              'Ensure Name is between 1-50 Characters.',
              'Ensure Name does not have Special Characters.'
            ])
        }
        else if(res.error.message === "Incorrect File Type"){
          setErrors(['Ensure file is .png or .jpeg'])
        }
      })
  }

  return(
    <div className = "accountCard paddingTop50px">
      <h2 className = "paddingLeft5percent colorWhite">Update Event Info</h2>
      <hr className = "margin0auto"></hr>
      <form className = "textAlignCenter" onSubmit = {handleUpdate} >
        {
          errors.length !== 0
          ?
            <div className = "paddingTopBottom20px">
              <div className = "errorBox textAlignCenter">
                <h3>Errors</h3>
                  <ul className = "popUpUL">
                    {errors.map((err, index) => {
                      return <li key = {index} className = "errorText">{err}</li>
                    })}
                  </ul>
              </div>
            </div>
          :
          null
        }
        <div className = 'drop-zone pointer margin0auto marginTop50px'>
          <span className = 'drop-zone__prompt'>Drop file here or click to upload</span>
          <input type = 'file' name = 'eventImage' className = 'drop-zone__input'/>
        </div>
        <div className = "marginTopBottom50px">
          <input className = "inputStyle colorWhite" type="text" placeholder={props.event.name} name = "name" required = "require"/>
        </div>
        <div>
          <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated='fade'>
            <Button.Content visible>Update Event</Button.Content>
            <Button.Content hidden><Icon name='line graph' /></Button.Content>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateEvent
