import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaInstagramSquare } from "react-icons/fa";
// import { FaTwitterSquare } from "react-icons/fa";
// import { FaTiktok } from "react-icons/fa";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  LinkedinFilled
} from '@ant-design/icons';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">

       <div className="footer-content">

        <h3>Contact Us</h3>
        <p>Email: tuni_wi03@gmai.com</p>
        <p>Phone: 0859076512</p>
        <p>Address: 27/19,CongHoa,TanBinh</p>
       </div>

       <div className="footer-content">
         <h3>Quick Links</h3>
         <ul className="list">
           <li className="navItem li">
             <Link to={"/"} className="navLink">Home</Link>
           </li>

           <li className="navItem li">
             <Link to={"/product"} className="navLink">Products</Link>
           </li>

           <li className="navItem li">
             <Link to={"/about"} className="navLink">About</Link>
           </li>

           <li className="navItem li">
             <Link to={"contact"} className="navLink">Contact</Link>
           </li>
         </ul>
     </div>
    <div className="footer-content">
        <h3>Follow Us</h3>
        <ul className="social-icons">
           <div className='footer_icon'>
            <FacebookFilled className='icon_ft'/>
            <InstagramFilled className='icon_ft'/>
            <TwitterOutlined className='icon_ft'/>
            <LinkedinFilled className='icon_ft'/>

             {/* <FaFacebookSquare className='icon_ft'/>
             <FaInstagramSquare className='icon_ft'/>
             <FaTwitterSquare className='icon_ft'/>
             <FaTiktok className='icon_ft'/> */}
           </div>
        </ul>
    </div>
    </div>
    <div className="bottom-bar">
    <p>@WindyIris_2003_2024</p>
    </div>
</div>
    
  )
}

export default Footer