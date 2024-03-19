import React from 'react'
import './Style.css'
import img1 from '../../assets/images/h_slide1.jpg'
import img2 from '../../assets/images/h_slide2.jpg'
import img3 from '../../assets/images/h_slide3.jpg'

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
                    <h1>Taj Mahal</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, placeat.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img2} className="image"/>
            <img src={img2} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Marina Bay</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, placeat.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img3} className="image"/>
            <img src={img3} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Great Wall</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, placeat.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img3} className="image"/>
            <img src={img3} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Statue Liberty</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, placeat.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <img src={img1} className="image"/>
            <img src={img1} className="background"/>
            <div className="layer">
                <div className="info">
                    <h1>Fuji Mountain</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, placeat.</p>
                </div>
            </div>
        </div>
      </div> 
    </div>  
    </div>
    
    
  )
}

export default Flower