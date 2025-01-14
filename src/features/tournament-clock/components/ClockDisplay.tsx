import { useCallback, useEffect, useRef, useState } from "react";
import { ClockActions } from "./ClockActions";
import { playSound } from "../utils/playSound";

import styles from "./ClockDisplay.module.css";

type Props = {
  levelTime: number;
  startOnRender: boolean;
  onTimerPause: () => void;
  onTimerEnd: () => void;
  onPreviousLevel: () => void;
  onNextLevel: () => void;
};

const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * SECONDS_IN_MINUTE;
const LOW_PITCH_BEEP = 493.883;
const HIGH_PITCH_BEEP = 659.255;

export function ClockDisplay({
  levelTime,
  startOnRender,
  onTimerPause,
  onTimerEnd,
  onPreviousLevel,
  onNextLevel,
}: Props) {
  // The time when the timer is supposed to end (in ms)
  const [endTime, setEndTime] = useState(Date.now() + levelTime * MS_IN_MINUTE);
  // The current time (in ms)
  const [now, setNow] = useState(Date.now());
  // Whether or not the timer is paused
  const [isPaused, setIsPaused] = useState(true);

  // Ref to hold the interval ID
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Ref to hold the AudioContext instance
  const audioContextRef = useRef<AudioContext | null>(null);

  // The amount of time remaining in the level
  const timeRemaining = endTime - now;

  // Convert the time remaining into minutes and seconds
  const minutes = Math.floor(timeRemaining / MS_IN_MINUTE);
  const seconds = Math.floor((timeRemaining / MS_IN_SECOND) % SECONDS_IN_MINUTE);

  // Handles starting the clock timer
  const handleStart = useCallback(() => {
    // Create a new audio context
    audioContextRef.current = new AudioContext();

    setIsPaused(false);

    // Update the time the clock is supposed to end by adding the time remaining to the current time
    setEndTime(Date.now() + timeRemaining);
    setNow(Date.now());

    // Clear the previous interval to prevent multiple intervals from being started
    clearInterval(intervalRef.current!);
    intervalRef.current = null;

    // Every half second, update the current time, which will update the time on the clock
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 500);
  }, [timeRemaining]);

  // Handles pausing the clock timer
  const handlePause = useCallback(() => {
    setIsPaused(true);

    clearInterval(intervalRef.current!);
    intervalRef.current = null;

    onTimerPause();
  }, [onTimerPause]);

  // Handles adding 1 minute to the clock when the add button is clicked
  const handleAddTime = useCallback(() => {
    setEndTime(endTime + MS_IN_MINUTE);
  }, [endTime]);

  // Handles subtracting 1 minute to the clock when the subtract button is clicked
  const handleSubtractTime = useCallback(() => {
    setEndTime(endTime - MS_IN_MINUTE);
  }, [endTime]);

  // Handles stopping the timer and playing sounds once its finished
  useEffect(() => {
    if (minutes === 0 && seconds >= 1 && seconds <= 5) {
      playSound(audioContextRef.current!, LOW_PITCH_BEEP, audioContextRef.current!.currentTime, 0.15);
    } else if (minutes <= 0 && seconds <= 0) {
      playSound(audioContextRef.current!, HIGH_PITCH_BEEP, audioContextRef.current!.currentTime, 0.25);
      clearInterval(intervalRef.current!);
      onTimerEnd();
    }
  }, [minutes, onTimerEnd, seconds]);

  // Handles starting the clock on render
  useEffect(() => {
    if (startOnRender && intervalRef.current === null) {
      handleStart();
    }
  }, [handleStart, startOnRender]);

  return (
    <section className={styles.container}>
      <div data-qa="timer" className={styles.timer}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>

      <ClockActions
        isPaused={isPaused}
        onStart={handleStart}
        onPause={handlePause}
        onStepBack={onPreviousLevel}
        onStepForward={onNextLevel}
        onSubtractTime={handleSubtractTime}
        onAddTime={handleAddTime}
      />

      <progress className={styles.progress} max={1} value={timeRemaining / (levelTime * MS_IN_MINUTE)} />
    </section>
  );
}
