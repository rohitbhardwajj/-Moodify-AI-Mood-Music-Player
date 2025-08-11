import React, { useRef, useState } from 'react';
import './Header.scss';
import MoodOverlayPlayer from './MoodOverlayPlayer.jsx';
import Typewriter from "typewriter-effect";

const Header = () => {
  const moodPlayerRef = useRef();
  const [loading, setLoading] = useState(false);

  const detectMoodHandler = async () => {
    if (moodPlayerRef.current) {
      setLoading(true); // Loader start
      await moodPlayerRef.current.detectMood(); // Mood detection call
      setLoading(false); // Loader stop
    }
  };

  return (
    <>
      <h1 className='headerTitle'>
        <Typewriter
          options={{
            strings: [
              "Your Mood, Your Music",
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
          <p>Your Current mood is being analyzed in real time. Enjoy music tailored to your feelings</p>

          {loading ? (
            <div className="loader"></div>
          ) : (
            <button onClick={detectMoodHandler}>Start Detecting...</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
