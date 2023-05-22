import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Home.css"

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-content'>
        <p>React Weather App</p>
        <Link to="/weatherInfoe"><button>Get Started</button></Link>
      </div>
    </div>
  )
}

export default Home
