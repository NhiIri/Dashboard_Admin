import React from 'react'
import './Style.css'
import img1 from '../../assets/images/home2.jpg'
import img2 from '../../assets/images/home3.jpg'
import img3 from '../../assets/images/home6.jpg'
import img4 from '../../assets/images/home1.jpg'
import img5 from '../../assets/images/home9.jpg'

const Flower = () => {
  return (
    <div className='flowerr'>
      <div className='bodyy'>
       <div className='mainn'>
        <div className="card">
            <img src={img1} className="image"/>
            <img src={img1} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Colorful</h1>
                    <p>Flowers enchant us not just with their delicate petals or alluring fragrances, but also with their vibrant hues that paint the world with beauty.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img2} className="image"/>
            <img src={img2} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Impressive</h1>
                    <p>Flowers leave a strong impression on us in many different ways.Each flower evokes a range of emotions, from a sense of tranquility to a burst of joy or admiration.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img3} className="image"/>
            <img src={img3} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Dazzling</h1>
                    <p>The brilliance of flowers is truly remarkable, each bloom carries within it a radiance that captivates the eye and uplifts the spirit.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img4} className="image"/>
            <img src={img4} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Charming</h1>
                    <p>Each bloom carries itself with a natural poise, captivating the beholder with its delicate movements and exquisite form.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img5} className="image"/>
            <img src={img5} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Captivating</h1>
                    <p>The allure of flowers lies in their ability to captivate our hearts and minds with their beauty, fragrance, and symbolism. </p>
                </div>
            </div>
        </div>
      </div> 
    </div>  
    </div>
    
    
  )
}

export default Flower