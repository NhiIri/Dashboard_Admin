import React from 'react'
import Navbar from '../Navbar/Navbar'
import HeaderComponent from '../User_Cart_Component/User_Cart_Component'


const DefaultComponent = ({children}) => {
  return (
    <div>
        <Navbar/>
     
        {children}
    </div>
  )
}

export default DefaultComponent