import React from 'react'
import './Header.scss'
import MoodOverlayPlayer from './MoodOverlayPlayer.jsx'
const Header = () => {
  return (
    <>
    <h1>Live Mood Detection</h1>
    <div className='headerrr'>
        <div className="headerLft">
            <MoodOverlayPlayer />
        </div>
        <div className="headerRgt"></div>
    </div>
    </>
  )
}

export default Header