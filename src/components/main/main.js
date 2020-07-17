import React, {useState} from 'react'
import { Buttun, Icon } from 'semantic-ui-react'

const Main = (props) => {
  return (
    <div className = "height100vh greenBackground">
      <div className = "contentDiv width80percent margin0auto paddingTopBottom50px textAlignCenter'">
        <div className = "textAlignCenter">
          <div>
            <h1 className = 'fontSize80px colorWhite'>The Techie Graph</h1>
          </div>
        </div>
      </div>
      <div className = 'paralax1'></div>
      <div className = 'contentDiv width80percent margin0auto paddingTopBottom50px textAlignCenter'>
        <div>
          <h2 className = 'colorWhite paddingBottom20px fontSize40px'>User Information</h2>
          <p className = 'colorWhite'>
            If you would like to interact with the app feel free to sign up! All you have to do is remember your password.
            Once you are done interacting with the website you can visit your Profile page, scroll to the bottom, type your password, and
            delete your user information from the database.
          </p>
        </div>
      </div>
      <div className = 'paralax2'></div>
      <div className = 'contentDiv width80percent margin0auto paddingTopBottom50px textAlignCenter'>
        <div>
          <h2 className = 'colorWhite paddingBottom20px fontSize40px'>About This Project</h2>
          <p className = 'colorWhite'>
            Since arriving in Florida, I have been amazed with the amount of lizards that populate this region. As I worked on my computer, I frequently found myself
            keeping a mental track of the lizards that skittered across my window. I even witnessed how they hunt flies! I began wanting to keep track of
            quantitave and qualitative data I saw. At first, I thought of using exel, but with my limited knowledge in exel that seemed like a daunting task.
            Thats when I decided to begin developing this Web App. The goal of this app is to allow user to create easily create a visual representation of data.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
