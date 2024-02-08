import { useEffect, useState } from "react";
import { FullScreen } from "@chiragrupani/fullscreen-react";
import { Blind } from "../../../types";
import { useLocalStorage } from "../../../hooks";
import { playSound } from "../utils/playSound";

import { Icon } from "../../../components";

import styles from "./TournamentClock.module.css";

type Props = {
  levels: Blind[];
};

/* TODO: Features to Implement
- Save/load current level to/from localStorage
*/
export function TournamentClock({ levels }: Props) {
  const [levelIndex, setLevelIndex] = useLocalStorage("uwpsc-level-index", 0);

  const [paused, setPaused] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currLevel, setCurrLevel] = useState(levelIndex);

  const [timerOver, setTimerOver] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  let now = new Date();
  const [countdownDate, setCountdownDate] = useState(new Date(now).setMinutes(now.getMinutes() + levels[0].time));
  const [countdown, setCountdown] = useState(countdownDate - new Date().getTime());

  // toggleTimer toggles the state of the timer from paused to unpaused and
  // vice versa. If the timer is being started, it will update the
  // countdownDate state with the time remaining on the countdown.
  const toggleTimer = () => {
    // If starting the timer, update countdownDate with the time remaining
    if (paused) {
      now = new Date();

      setCountdownDate(new Date(now).setMinutes(now.getMinutes() + minutes, now.getSeconds() + seconds));
    }

    setPaused((p) => !p);
  };

  const addMinute = () => {
    setCountdown((c) => c + 1000 * 60);
    setCountdownDate((c) => c + 1000 * 60);
  };

  const subtractMinute = () => {
    setCountdown((c) => c - 1000 * 60);
    setCountdownDate((c) => c - 1000 * 60);
  };

  const nextLevel = () => {
    if (currLevel >= levels.length - 1) {
      return;
    }

    setCurrLevel((i) => {
      const n = i + 1;
      now = new Date();
      const newTime = new Date(now).setMinutes(now.getMinutes() + levels[n].time);
      setCountdown(Math.ceil((newTime - new Date().getTime()) / 1000) * 1000);
      setCountdownDate(newTime);

      setLevelIndex(n);
      return n;
    });
  };

  const previousLevel = () => {
    if (currLevel === 0) {
      return;
    }

    setCurrLevel((i) => {
      const n = i - 1;
      now = new Date();
      const newTime = new Date(now).setMinutes(now.getMinutes() + levels[n].time);
      setCountdown(Math.ceil((newTime - new Date().getTime()) / 1000) * 1000);
      setCountdownDate(newTime);

      setLevelIndex(n);
      return n;
    });
  };

  // Create an interval for every 1 second that will calculate the time
  // remaining in the countdown. If the timer is paused or over do nothing.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !timerOver) {
        setCountdown(countdownDate - new Date().getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate, paused, timerOver]);

  // Update the minutes and seconds everytime the countdown timer
  // updates. If the timer has completed it will stop updating.
  useEffect(() => {
    const minutesRemaining = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((countdown % (1000 * 60)) / 1000);

    // Play sound if in the last 5 seconds
    if (minutesRemaining === 0 && secondsRemaining >= 1 && secondsRemaining <= 5) {
      const audioContext = new AudioContext();
      playSound(audioContext, 493.883, audioContext.currentTime, 0.15);
    } else if (minutesRemaining === 0 && secondsRemaining === 0) {
      // Advance current level index and play next level sound
      setCurrLevel((i) => {
        const n = i + 1;
        setLevelIndex(n);
        return n;
      });
      const audioContext = new AudioContext();
      playSound(audioContext, 659.255, audioContext.currentTime + 0.15, 0.25);
    }

    setMinutes(minutesRemaining);
    setSeconds(secondsRemaining);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  // Updates the timer based on the current blind level. If there are no
  // more levels set the timer to finished.
  useEffect(() => {
    // No more levels left.
    if (currLevel === levels.length) {
      setTimerOver(true);
    } else {
      // Reset timer to new level time
      const now = new Date();
      setCountdownDate(new Date(now).setMinutes(now.getMinutes() + levels[currLevel].time));
    }
  }, [currLevel, levels]);

  return (
    <FullScreen isFullScreen={isFullscreen} onChange={(isFull: boolean) => setIsFullscreen(isFull)}>
      <div className={`${styles.grid} ${isFullscreen ? styles.gridFullscreen : ""}`}>
        <span onClick={() => setIsFullscreen(!isFullscreen)} className={styles.fullscreen}>
          <Icon scale={2} iconType="expand" />
        </span>
        <section className={styles.timer}>
          <header className={styles.timerHeader}>
            <span>Level {currLevel + 1}</span>
          </header>

          <div className={styles.timerDisplay}>
            <span>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>

          <div className={styles.timerButtons}>
            <span onClick={previousLevel}>
              <Icon iconType="backward_step" scale={4} />
            </span>
            <span onClick={subtractMinute}>
              <Icon iconType="minus" scale={4} />
            </span>
            <span onClick={toggleTimer}>
              {paused ? <Icon iconType="circle-play" scale={4} /> : <Icon iconType="circle-pause" scale={4} />}
            </span>
            <span onClick={addMinute}>
              <Icon iconType="plus" scale={4} />
            </span>
            <span onClick={nextLevel}>
              <Icon iconType="forward_step" scale={4} />
            </span>
          </div>
        </section>

        <progress
          className={styles.progress}
          max={1}
          value={currLevel !== levels.length ? countdown / (levels[currLevel].time * 60 * 1000) : 1}
        ></progress>

        <section className={styles.blinds}>
          <header className={styles.blindsHeader}>Blinds</header>
          <span className={styles.blindsAmount}>
            {currLevel !== levels.length
              ? `${levels[currLevel].small} / ${levels[currLevel].big}`
              : `${levels[currLevel - 1].small} / ${levels[currLevel - 1].big}`}
          </span>
          {currLevel < levels.length && (
            <div className={styles.blindsNext}>
              <header className={styles.blindsNextHeader}>Next Level</header>
              <span className={styles.blindsNextAmount}>
                {currLevel + 1 < levels.length
                  ? `${levels[currLevel + 1].small} / ${levels[currLevel + 1].big}`
                  : `${levels[currLevel].small} / ${levels[currLevel].big}`}
              </span>
            </div>
          )}
        </section>

        <section className={styles.ante}>
          <header className={styles.anteHeader}>Ante</header>
          <span className={styles.anteAmount}>
            {currLevel !== levels.length ? `${levels[currLevel].ante}` : `${levels[currLevel - 1].ante}`}
          </span>
          {currLevel < levels.length && (
            <div className={styles.anteNext}>
              <header className={styles.anteNextHeader}>Next Level</header>
              <span className={styles.anteNextAmount}>
                {currLevel + 1 < levels.length ? `${levels[currLevel + 1].ante}` : `${levels[currLevel].ante}`}
              </span>
            </div>
          )}
        </section>
      </div>
    </FullScreen>
  );
}
