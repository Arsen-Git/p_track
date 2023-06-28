import { useState, useEffect } from "react";

import "./Timer.scss";

export default function Timer() {
  const [seconds, setSeconds] = useState(120);
  const [timerActive, setTimerActive] = useState(false);

  const audioEnd = new Audio("https://www.fesliyanstudios.com/play-mp3/5328");

  const onInputChange = (e) => {
    if (e.target.value >= 0) setSeconds(+e.target.value);
  };

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  const startTick = () => {
    setTimerActive(true);
    setTimeout(() => {
      audioEnd.play();
    }, seconds * 1000);
  };

  return (
    <div className="timer">
      <h2>Відпочиваємо:</h2>
      <input
        onChange={onInputChange}
        type="number"
        value={seconds}
        placeholder="0"
      />
      <p>секунд</p>
      <button disabled={timerActive} onClick={startTick}>
        Стартуємо
      </button>
    </div>
  );
}
