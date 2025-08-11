import React, { useRef, useState, useContext } from "react";
import "./AllSong.scss";
import { FaPlay, FaPause } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const AllSong = () => {
  const { allSongData } = useContext(AppContext);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);

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

      audio.play();
      setPlayingIndex(index);
    }
  };

  return (
    <div className="allSongContainer">
      {allSongData?.map((song, idx) => (
        <div key={idx} className="songdiv">
          <audio id={`audio-${idx}`} src={song.url} />
          <h3>{song.name.split("_")[0]}</h3> 
          <div onClick={() => togglePlay(idx)}>
            {playingIndex === idx ? <FaPause /> : <FaPlay />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSong;
