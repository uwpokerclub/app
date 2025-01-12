import { Icon } from "../../../components";

import styles from "./ClockActions.module.css";

type Props = {
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onSubtractTime: () => void;
  onAddTime: () => void;
};

export function ClockActions({
  isPaused,
  onStart,
  onPause,
  onStepBack,
  onStepForward,
  onSubtractTime,
  onAddTime,
}: Props) {
  return (
    <div className={styles.row}>
      <span data-qa="prev-level-btn" onClick={onStepBack}>
        <Icon iconType="backward_step" scale={4} />
      </span>
      <span data-qa="sub-btn" onClick={onSubtractTime}>
        <Icon iconType="minus" scale={4} />
      </span>
      <span data-qa="toggle-timer-btn" onClick={isPaused ? onStart : onPause}>
        {isPaused ? <Icon iconType="circle-play" scale={4} /> : <Icon iconType="circle-pause" scale={4} />}
      </span>
      <span data-qa="add-btn" onClick={onAddTime}>
        <Icon iconType="plus" scale={4} />
      </span>
      <span data-qa="advance-level-btn" onClick={onStepForward}>
        <Icon iconType="forward_step" scale={4} />
      </span>
    </div>
  );
}
