import React from 'react'
import './information.css'
import img from '../../assets/images/fl4.jpg'
import img2 from '../../assets/images/fl6.jpg'
import img3 from '../../assets/images/fl3.jpg'

const Data = [
  {
    id:1,
    imgSrc: img,
    destTitle:'FREEDOM',
    location: 'FREEDOM',
    grade: 'Freedom is never dear at any price. It is the breath of life. What would a man not pay for living?',
   },
  {
  id:2,
  imgSrc: img2,
  destTitle:'SWEETNESS',
  location: 'SWEETNESS',
  grade: 'You may only be one person to the world but you may be the world to one person!!!',
 },
 {
  id:3,
  imgSrc: img3,
  destTitle:'HAPPINESS',
  location: 'HAPPINESS',
  grade: 'There is no value in life except what you choose to place upon it and no happiness in any place except what you bring to it yourself.',
 },

]

const Information = () => {
  return (
    <section className='infomation'>
      <div className='secContainer'> 

      <div className='sec_header'>
        <div className='textDiv'>
          <h1 className='sec_title'>Shop's Message</h1>
          <p>
          There are always flowers for those who want to see them...
          </p>
        </div>

        {/* <div className='iconsDiv flex'> 
        <FaChevronLeft className='icon left_icon'/>
        <FaChevronRight className='icon right_icon'/>

        </div> */}

      </div>

      <div className='mainContent'>
        {
          Data.map(({id,imgSrc,destTitle,location,grade})=>{
            return(
              <div className='singleDestination'>
          <div className='dest_img'>
            <img src ={imgSrc} alt="img_title"/>
            <div className='overlayInfo'>
              <h3>{destTitle}</h3>
              <p>
                {grade} 
              </p>
              {/* <FaArrowRightLong  className='icon'/> */}

            </div>

          </div>
          <div className='dest_footer'>
            <div className='number'>
              0{id}
            </div>
            <div className='dest_test'>
              <h6>{location}</h6>
              <span className='flex'> 
                <span className='flower'>
                {/* <PiFlowerLotusThin className='icon'/> */}
                </span>
                WindyIris
              </span>
            </div>

             
          </div>
        
        </div>
            )
          })
        }

      </div>

      </div>

    </section>
  )
}

export default Information