import React, { useContext } from 'react';
import './FullscreenMood.scss';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const FullscreenMood = () => {
  const { mood, setMood, setShowMoodOverlay, setAllSongData } = useContext(AppContext);

  const remove = () => {
    setShowMoodOverlay(false);
  };

  const GetAllSSongs = async () => {
    try {
      const response = await axios.get('https://moodify-ai-mood-music-player.onrender.com/songs');

      let currentMood = mood.toLowerCase();
      if (currentMood === 'surprised') {
        currentMood = 'excitement';
        setMood('excitement');
      }

      const filteredSongs = response.data.filter(song => song.mood === currentMood);

      if (filteredSongs.length === 0) {
        alert("No songs found for this mood");
        return;
      }

      setAllSongData(filteredSongs);
      console.log(filteredSongs);
      alert("Enjoy your music!");
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  return (
    <div className='fullscreenMood'>
      <h1 className='fullscreenMood__title'>
        Your Current Mood is: <span style={{ color: "#ff4081" }}>{mood || "Neutral"}</span>
      </h1>
      <button onClick={() => { GetAllSSongs(); remove(); }}>
        Get Song Recommendations
      </button>
    </div>
  );
};

export default FullscreenMood;
