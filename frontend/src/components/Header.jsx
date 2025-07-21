import React, { useRef, useContext } from 'react';
import './Header.scss';
import MoodOverlayPlayer from './MoodOverlayPlayer.jsx';
import Typewriter from "typewriter-effect";
import { AppContext } from '../context/AppContext';

const Header = () => {
  const moodPlayerRef = useRef();

  const detectMoodHandler = () => {
    if (moodPlayerRef.current) {
      moodPlayerRef.current.detectMood();
    }
  };

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
          <MoodOverlayPlayer ref={moodPlayerRef} />
        </div>
        <div className="headerRgt">
          <h4>Moody Player</h4>
          <p>Your Current mood is being analyzed in <br /> real time. Enjoy music Tailored to your feelings</p>
          <button onClick={detectMoodHandler}>Start Detecting...</button>
        </div>
      </div>
    </>
  );
};

export default Header;
