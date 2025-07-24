import React, { useRef, useState } from 'react';
import './AllSong.scss';
import { FaPlay, FaPause } from "react-icons/fa";

const AllSong = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='allSongContainer'>
      <div className="songdiv">
        <audio ref={audioRef} src="/hone.mp3" />
        <h3>Click to {isPlaying ? 'pause' : 'play'}</h3>
        <div onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
      </div>

      {/* Extra song without functionality */}
      <div className="songdiv">
        <audio src="/hone.mp3" />
        <h3>Click to play</h3>
        <FaPlay />
      </div>
    </div>
  );
};

export default AllSong;
