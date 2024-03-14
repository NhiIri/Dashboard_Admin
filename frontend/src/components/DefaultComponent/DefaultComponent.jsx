import React from 'react'
import HeaderComponent from '../HeaderCompoent/HeaderComponent'
import Navbar from '../Navbar/Navbar'

const DefaultComponent = ({children}) => {
  return (
    <div>
        <Navbar/>
        <HeaderComponent />
        {children}
    </div>
  )
}

export default DefaultComponent