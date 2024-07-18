import React, { useState } from 'react';
import './App.css';
import DrumPad from './DrumPad';
import data1 from './data';
import data2 from './data2';

function App() {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(0.5); // Initial volume set to 50%

  const handleClick = (name) => {
    setDisplay(name);
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const drumPad = data1.find((pad) => pad.key === key) || data2.find((pad) => pad.key === key);
    if (drumPad) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.volume = volume; // Set volume
      audio.play();
      setDisplay(drumPad.name);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };

  return (
    <div className="App" onKeyDown={handleKeyPress} tabIndex="0">
      <div id="container-left">
        <h2>Data Set 1</h2>
        <div id="drum-machine">
          <div id="display">{display}</div>
          <div className="drum-pads">
            {data1.map((drumPad) => (
              <DrumPad key={drumPad.key} pad={drumPad} onClick={handleClick} volume={volume} />
            ))}
          </div>
        </div>
      </div>
      <div id="container-right">
        <h2>Data Set 2</h2>
        <div id="drum-machine">
          <div id="display">{display}</div>
          <div className="drum-pads">
            {data2.map((drumPad) => (
              <DrumPad key={drumPad.key} pad={drumPad} onClick={handleClick} volume={volume} />
            ))}
          </div>
        </div>
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <p>Volume: {Math.round(volume * 100)}%</p>
      </div>
    </div>
  );
}

export default App;
