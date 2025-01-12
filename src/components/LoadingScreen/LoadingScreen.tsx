import styles from "./LoadingScreen.module.css";

export function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
