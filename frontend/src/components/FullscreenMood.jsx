import React from 'react'
import './FullscreenMood.scss'
const FullscreenMood = () => {

    const remove = () => {
        const element = document.querySelector('.fullscreenMood');
        element.style.display = 'none';
    };
  return (
    <div className='fullscreenMood'>
        <h1>Your Current Mood is: Happy </h1>
        <button onClick={remove}>Get Song Recommendations</button>
    </div>
  )
}

export default FullscreenMood