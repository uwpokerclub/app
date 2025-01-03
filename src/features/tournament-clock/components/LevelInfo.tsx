import styles from "./LevelInfo.module.css";

type Props = {
  type: string;
  title: string;
  current: string;
  next?: string;
};

export function LevelInfo({ type, title, current, next }: Props) {
  return (
    <section className={`${styles[type]} ${styles.container}`}>
      <header className={styles.header}>{title}</header>
      <span className={styles.amount}>{current}</span>
      {next && (
        <div className={styles.next}>
          <header className={styles.header}>Next Level</header>
          <span className={styles.amount}>{next}</span>
        </div>
      )}
    </section>
  );
}
