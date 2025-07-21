import React, { useState } from "react";
import './App.scss';
import Header from './components/Header.jsx';
const App = () => {
 

  const [mood, setMood] = useState(null);
  // console.log(mood)
  return (
    <div className="containerr">
      <Header mood={mood} setMood={setMood} />
    </div>
  );
};

export default App;
