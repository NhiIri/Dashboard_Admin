import React from 'react'
import SideMenuCpn from '../SideMenuCpn/SideMenuCpn'
import Navbar from '../Navbar/Navbar'


const DefaultComponent = ({children}) => {
  return (
    <div >
        <div>
        <Navbar/>
        <SideMenuCpn />
        </div>
        <div className="">
       
        {children}
       </div>
         
        
    </div>
  )
}

export default DefaultComponent