import React from 'react'
import './Header.scss'
import MoodOverlayPlayer from './MoodOverlayPlayer.jsx'
import Typewriter from "typewriter-effect";
const Header = () => {
  return (
    <>
      <h1 className='headerTitle'>
        <Typewriter
          options={{
            strings: [
              "Welcome to Moody Player",
              "Your Mood, Your Music",
              "Feel the Beat of Your Emotions"
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

    <div className='headerrr'>
        <div className="headerLft">
            <MoodOverlayPlayer />
        </div>
        <div className="headerRgt">
            <h4>Moody Player</h4>
            <p>Your Current mood is being analyzed in <br /> real time . Enjoy music Tailored to your feelings</p>
            <button>Start Detecting...</button>
        </div>
    </div>
    </>
  )
}

export default Header