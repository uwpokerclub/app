import { useCallback, useEffect, useRef, useState } from "react";
import { Blind } from "../../../sdk/structures";
import { useLocalStorage } from "../../../hooks";
import { ClockDisplay } from "./ClockDisplay";
import { LevelInfo } from "./LevelInfo";

import styles from "./TournamentClock.module.css";
import { Icon } from "../../../components";

type Props = {
  levels: Blind[];
};

export function TournamentClock({ levels }: Props) {
  // The index of the current level, tracked in local storage
  const [levelIndex, setLevelIndex] = useLocalStorage(import.meta.env.VITE_LOCAL_STORAGE_KEY, 0);
  // Whether or not the clock sould automatically start
  const [shouldStart, setShouldStart] = useState(false);

  // Ref to hold the entire clock HTML elements used to enable fullscreen
  const clockElementRef = useRef<HTMLDivElement | null>(null);
  // Ref used to enable/disable screen lock
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Handles acquiring a screen clock so the device does not go to sleep when the clock is running
  useEffect(() => {
    const requestWakeLock = async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        } catch (err) {
          console.error("Failed to acquire a screen lock: ", err);
        }
      } else {
        console.error("The Screen Wake Lock API is not supported");
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().then(() => {
          wakeLockRef.current = null;
        });
      }
    };
  }, []);

  // Handles stopping the auto-start feature when the timer is paused
  const handleTimerPause = useCallback(() => setShouldStart(false), []);

  // Handles advancing to the next level when the timer is finished
  const handleTimerEnd = useCallback(() => {
    if (levelIndex >= levels.length - 1) {
      setShouldStart(false);
      return;
    }

    setShouldStart(true);

    setLevelIndex(levelIndex + 1);
  }, [levelIndex, levels.length, setLevelIndex]);

  // Handles skipping to the previous level
  const handlePreviousLevel = useCallback(() => {
    if (levelIndex === 0) return;

    setLevelIndex(levelIndex - 1);
  }, [levelIndex, setLevelIndex]);

  // Handles skipping to the next level
  const handleNextLevel = useCallback(() => {
    if (levelIndex === levels.length - 1) return;

    setLevelIndex(levelIndex + 1);
  }, [levelIndex, levels.length, setLevelIndex]);

  // Handles enabling/disabling fullscreening the clock
  const handleFullscreen = () => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    } else {
      clockElementRef.current!.requestFullscreen();
    }
  };

  return (
    <div ref={clockElementRef} className={`${styles.grid}`}>
      <span onClick={handleFullscreen} className={styles.fullscreen}>
        <Icon scale={2} iconType="expand" />
      </span>

      <header data-qa="level" className={styles.timerHeader}>
        Level {levelIndex + 1}
      </header>

      <ClockDisplay
        key={levelIndex}
        startOnRender={shouldStart}
        levelTime={levels[levelIndex].time}
        onTimerPause={handleTimerPause}
        onTimerEnd={handleTimerEnd}
        onPreviousLevel={handlePreviousLevel}
        onNextLevel={handleNextLevel}
      />

      <LevelInfo
        type="blinds"
        title="Blinds"
        current={`${levels[levelIndex].small} / ${levels[levelIndex].big}`}
        next={
          levelIndex < levels.length - 1 ? `${levels[levelIndex + 1].small} / ${levels[levelIndex + 1].big}` : undefined
        }
      />

      <LevelInfo
        type="ante"
        title="Ante"
        current={`${levels[levelIndex].ante}`}
        next={levelIndex < levels.length - 1 ? `${levels[levelIndex + 1].ante}` : undefined}
      />
    </div>
  );
}
