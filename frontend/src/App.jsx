import React, { useContext } from "react";
import './App.scss';
import Header from './components/Header.jsx';
import FullscreenMood from './components/FullscreenMood.jsx';
import { AppContext } from './context/AppContext';
import AllSong from "./components/AllSong.jsx";

const App = () => {
  const { showMoodOverlay } = useContext(AppContext);

  return (
    <div className="containerr">
      <Header />
      {showMoodOverlay && <FullscreenMood />}
      <AllSong />
    </div>
  );
};

export default App;
