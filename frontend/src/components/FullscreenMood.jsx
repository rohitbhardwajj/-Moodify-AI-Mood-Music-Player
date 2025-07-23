import React, { useContext } from 'react';
import './FullscreenMood.scss';
import { AppContext } from '../context/AppContext';

const FullscreenMood = () => {
  const { mood, setShowMoodOverlay } = useContext(AppContext);

  const remove = () => {
    setShowMoodOverlay(false);
  };

  return (
    <div className='fullscreenMood'>
      <h1 className='fullscreenMood__title'>Your Current Mood is: <span style={{ color: "#ff4081" }}>{mood || "Neutral"}</span></h1>
      <button onClick={remove}>Get Song Recommendations</button>
    </div>
  );
};

export default FullscreenMood;
