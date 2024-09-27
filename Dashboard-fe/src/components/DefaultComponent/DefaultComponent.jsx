import React from 'react'
import SideMenuCpn from '../SideMenuCpn/SideMenuCpn'


const DefaultComponent = ({children}) => {
  return (
    <div className="SideMenuAndPageContent">
         <SideMenuCpn />
        {children}
    </div>
  )
}

export default DefaultComponent