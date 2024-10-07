import React from 'react'
import SideMenuCpn from '../SideMenuCpn/SideMenuCpn'
import Navbar from '../Navbar/Navbar'


const DefaultComponent = ({children}) => {
  return (
    <div >
        <div>
        <Navbar/>
        </div>
        <div className="SideMenuAndPageContent">
        <SideMenuCpn />
        {children}
       </div>
         
        
    </div>
  )
}

export default DefaultComponent