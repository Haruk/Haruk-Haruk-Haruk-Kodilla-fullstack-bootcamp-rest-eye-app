import React from 'react';
import { useState, useMemo } from 'react';
import { render } from 'react-dom';

const STATUSES = {
  OFF: `off`,
  WORK: `work`,
  REST: `rest`,
}

const App = () => {

  const [status, setStatus] = useState(STATUSES.OFF);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60);

    return `${`${minutes}`.length < 2 ? `0${minutes}` : minutes}:${`${seconds}`.length < 2 ? `0${seconds}` : seconds}`;
  }

  const formatedTime = useMemo(() => formatTime(time), [time]);


  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };


  const startTimer = () => {
    setTime(1200);
    setStatus(STATUSES.WORK);
    setTimer(setInterval(() => {

      setTime(prevTime => {

        if (prevTime <= 0) {

          setStatus(prevStatus => {

            if (prevStatus === STATUSES.WORK) {
              setStatus(STATUSES.REST)
              setTime(20);
              playBell()
            } else {
              setStatus(STATUSES.WORK)
              setTime(1200);
              playBell()
            }

          })

        } else {
          return prevTime - 1
        }

      });

    }, 1000));
  }

  const stopTimer = () => {
    setTimer(timer => {
      clearInterval(timer)
      return null
    });
    setTime(0);
    setStatus(STATUSES.OFF)
  }

  const closeApp = () => {
    window.close()
  }

  return (
    <div>
      <h1>Protect your eyes</h1>

      {status === STATUSES.OFF ? <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div> : ``}
      {status === STATUSES.WORK ? <img src="./images/work.png" /> : ``}
      {status === STATUSES.REST ? <img src="./images/rest.png" /> : ``}
      {status !== STATUSES.OFF ? <div className="timer">{formatedTime}</div> : ``}
      {status === STATUSES.OFF ? <button onClick={startTimer} className="btn">Start</button> : ``}
      {status !== STATUSES.OFF ? <button onClick={stopTimer} className="btn">Stop</button> : ``}
      <button onClick={closeApp} className="btn btn-close">X</button>

    </div>
  )
}


render(<App />, document.querySelector('#app'));
