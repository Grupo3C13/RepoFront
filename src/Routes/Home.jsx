import React, { useContext, useEffect, useState } from 'react'
import Search from '../Components/Search/Search'
import { GlobalContext } from "../Context/globalContext";
import Recommended from '../Components/Recommended/Recommended'
import './Home.css'


const Home = () => {
  
  const { productsList, isLoading } = useContext(GlobalContext);
  
  return (
    <div className='home'>
    <Search /> 
    </div>
  )
}

export default Home;