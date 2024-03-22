import React from 'react';
import {
    LeftCircleOutlined,
    RightCircleOutlined
  } from '@ant-design/icons';
import  images  from './images';
import './Gallery.css';

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <h1 className="headtext__cormorant">WindyIris Shop</h1>
        <p className="p__opensans" style={{ color: '#dddddd' }}>Have it your way!!!</p>
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {[images.gallery01, images.gallery02, images.gallery03, images.gallery04, images.gallery05, images.gallery06, images.gallery07].map((image, index) => (
            <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <LeftCircleOutlined  className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <RightCircleOutlined  className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
  );
};

export default Gallery