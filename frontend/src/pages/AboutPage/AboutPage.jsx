import React from 'react'
import Advantage from './ab_advantage/Advantage'
import Intro from './ab_intro/Intro'
import Info from './ab_info/Info'
import Video from './ab_video/Video'
import Footer from '../../components/Footer/Footer'

function AboutPage() {
  return (
    <div>
      <div style={{ height: '80%', width: '90%', margin: '20px auto' }}>
      <Video/>
      <Intro/>
      <Info/>
      <Advantage/>
          
    </div>
    <Footer/> 
    </div>
    
  )
}

export default AboutPage