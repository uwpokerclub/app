import { ReactNode } from "react";

import styles from "./InfoCard.module.css";

type InfoCardProps = {
  header?: string;
  subHeader?: string;
  children: ReactNode;
};

export function InfoCard({ header, subHeader, children }: InfoCardProps) {
  return (
    <div className={styles.container}>
      {header && (
        <header className={styles.header}>
          {header && <h3>{header}</h3>}
          {subHeader && <p className={styles.subHeader}>{subHeader}</p>}
        </header>
      )}
      <section className={styles.body}>{children}</section>
    </div>
  );
}
