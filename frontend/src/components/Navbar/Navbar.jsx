import React, {useState} from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const[active, setActive] = useState('navBar')
  const showNav =()=>{
    setActive('navBar activeNav')
  }
  const closeNav =()=>{
    setActive('navBar')
  }
  
  const [transparent, setTransparent] = useState ('header')
  const addGg = ()=>{
    if(window.scrollY >=10){
        setTransparent('header activeHeader')
    }
    else{
        setTransparent('header')
    }

  }
  window.addEventListener('scroll', addGg)



  return (
    <section className='NavSection'>
        <div className={transparent}>

            <div className='logo'>
                <h1 className='text'>
                WindyIris Shop
                </h1>
            </div>

            <div className={active}>
                <ul className='NavList flex'>

                    <li className="navItem li">
                        <Link to={"/"} className="navLink">Home</Link>
                    </li>

                    <li className="navItem li">
                        <Link to={"/products"} className="navLink">Products</Link>
                    </li>

                    <li className="navItem li">
                        <Link to={"/about"} className="navLink">About</Link>
                    </li>

                    <li className="navItem li">
                        <Link to={"contact"} className="navLink">Contact</Link>
                    </li>

                </ul>

                <div onClick = {closeNav} className='closeNav'>
                {/* <RiCloseCircleLine className='icon'/> */}
                </div>

            </div>

            <div onClick = {showNav} className="tonggleNav">
            {/* <MdMenu className='icon'/> */}
            </div>
        </div>
    </section>
  )
}



export default Navbar