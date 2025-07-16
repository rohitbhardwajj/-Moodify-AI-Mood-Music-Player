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
        <div className="headerRgt">
            <h4>Moody Player</h4>
            <p>Your Current mood is being analyzed in <br /> real time . Enjoy music Tailored to your feelings</p>
        </div>
    </div>
    </>
  )
}

export default Header