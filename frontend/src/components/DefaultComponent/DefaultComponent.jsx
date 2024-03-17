import React from 'react'
import HeaderComponent from '../HeaderCompoent/HeaderComponent'
import Navbar from '../Navbar/Navbar'
import SearchComponent from '../SearchComponent/SearchComponent'
import User_Cart_Component from '../User_Cart_Component/User_Cart_Component'

const DefaultComponent = ({children}) => {
  return (
    <div>
        <Navbar/>
     
        {children}
    </div>
  )
}

export default DefaultComponent