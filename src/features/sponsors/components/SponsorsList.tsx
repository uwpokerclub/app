import { InfoCard } from "../../../components";
import { sponsorsData } from "../sponsorsData";
import styles from "./SponsorsList.module.css";

export function SponsorsList() {
  return (
    <section className={styles.container}>
      <span className={styles.header}>Sponsors</span>
      {sponsorsData.map((sponsor, i) => (
        <InfoCard key={i}>{sponsor.body}</InfoCard>
      ))}
    </section>
  );
}
