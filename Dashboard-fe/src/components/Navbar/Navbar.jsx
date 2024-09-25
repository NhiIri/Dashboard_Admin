import React, {useState} from 'react'
import './navbar.css'
import User_Cart_Component from '../User_Cart_Component/User_Cart_Component'


const Navbar = () => {
  return (
    <div>
       <section className='NavSection'>
              <div style={{margin: '0 10% 0'}}>
                <ul className='NavList flex header'>                 
                    
                    <div style={{display:'flex', paddingLeft:'30%' }}>
                   <User_Cart_Component/> 
                    </div>

                </ul>
              </div>
                        
     </section> 
     <div style={{paddingBottom:'50px'}}></div>
    </div>
    
  )
}



export default Navbar