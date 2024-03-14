import React from 'react'
import './video.css'
import video from '../../../assets/video/ab_video.mp4'


const Video = () => {
  return (
    <div className='videoCard '>

      <div className='cardContent'>
        <div className='cardText'>
         <h2>
           WE ARE WINDYIRIS!!!
         </h2>
         <p>
         Come join us and explore the world of exquisite and refined flowers, where passion and dedication are expressed in every bloom!
         </p>

       </div>
       <div className='cardVideo'>
         <video src= {video} autoPlay loop muted type='video/mp4'>

         </video>

       </div>
     </div>
  
    </div>

    
  )
}

export default Video