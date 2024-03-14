import React from "react";
import ab_img from '../../../assets/images/ab_img2.jpg'
import './info.css'


const Info = () => {
  return (
    <div className="info-container">
      <div className="info-banner-container">
        
       <div className="info-bannerImage-container">
          <img src={ab_img} alt="" />
        </div>
       
        <div className="info-text-section">
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
        
      </div>
    </div>
  );
};

export default Info;