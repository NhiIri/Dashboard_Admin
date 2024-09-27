import React from 'react'
import Navbar from '../../components/Navbar/Navbar'


const DefaultComponent = ({children}) => {
  return (
    <div>
         <Navbar />
        {children}
    </div>
  )
}

export default DefaultComponent