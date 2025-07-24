import React, { useContext } from 'react';
import './FullscreenMood.scss';
import { AppContext } from '../context/AppContext';

import axios from 'axios';

const FullscreenMood = () => {
  const { mood, setShowMoodOverlay } = useContext(AppContext);

  const remove = () => {
    setShowMoodOverlay(false);
  };
  const { allSongData, setAllSongData } = useContext(AppContext);
  const GetAllSSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/songs');
      setAllSongData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  return (
    <div className='fullscreenMood'>
      <h1 className='fullscreenMood__title'>Your Current Mood is: <span style={{ color: "#ff4081" }}>{mood || "Neutral"}</span></h1>
      <button onClick={ ()=>{ GetAllSSongs(); remove(); }}>Get Song Recommendations</button>
    </div>
  );
};

export default FullscreenMood;
