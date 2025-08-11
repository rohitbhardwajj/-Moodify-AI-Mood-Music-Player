import React, { useRef, useState, useContext } from "react";
import "./AllSong.scss";
import { FaPlay, FaPause } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const AllSong = () => {
  const { allSongData } = useContext(AppContext);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const togglePlay = (index) => {
    const audio = document.getElementById(`audio-${index}`);
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      // pause previous if playing
      if (playingIndex !== null) {
        const prevAudio = document.getElementById(`audio-${playingIndex}`);
        if (prevAudio) prevAudio.pause();
      }

      setLoadingIndex(index); // loader on
      audio.play().catch(() => setLoadingIndex(null)); // play audio
    }
  };

  const handleCanPlay = (index) => {
    setLoadingIndex(null);
    setPlayingIndex(index);
  };

  const handleEnded = () => {
    setPlayingIndex(null);
  };

  return (
    <div className="allSongContainer">
      {allSongData?.map((song, idx) => (
        <div key={idx} className="songdiv">
          <audio
            id={`audio-${idx}`}
            src={song.url}
            onCanPlay={() => handleCanPlay(idx)}
            onEnded={handleEnded}
          />
          <h3>{song.name.split("_")[0]}</h3>
          <div onClick={() => togglePlay(idx)}>
            {loadingIndex === idx ? (
              <div className="loader"></div>
            ) : playingIndex === idx ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSong;
