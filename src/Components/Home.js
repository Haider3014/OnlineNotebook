import React from 'react'
import Notes from './Notes'

const Home=(props)=> {
  const {alertt}=props
  return (
    <div>
      <Notes alertt={alertt} />
    </div>
  )


}

export default Home