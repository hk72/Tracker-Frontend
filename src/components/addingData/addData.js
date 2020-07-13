import React, {useEffect} from 'react'
import history from '../../history'

const AddData = (props) => {

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Internal Server Error"){
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

  return(
    <div>

    </div>
  )
}

export default AddData
