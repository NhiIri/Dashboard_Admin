import React from "react";
import ab_img from '../../../assets/images/ab_img1.jpg'
import './intro.css'



const Intro = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
       
        <div className="home-text-section">
          <h1>
            Your Favourite Food Delivered Hot & Fresh
          </h1>
          <p>
            Healthy switcher chefs do all the prep work, like peeding, chopping
            & marinating, so you can cook a fresh food.
          </p>
          <button>      
            Order Now {" "}
          </button>
        </div>
        <div className="home-bannerImage-container">
          <img src={ab_img} alt="" />
        </div>
        <div className="home-image-section">
          <img src='' alt="" />
        </div>
      </div>
    </div>
  );
};

export default Intro;