import React, {useState, useContext, useEffect} from 'react'


//internal import
import {HeroSection} from '../Components/index'
export const Home = () => {
  return (
    <div>
      <HeroSection accounts='Hey' tokenData= "Data" />
    </div>
  )
}

export default Home
