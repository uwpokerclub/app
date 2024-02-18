import { InfoCard } from "../../../components";
import { blogPosts } from "../blogPosts";

import styles from "./Blog.module.css";

export function Blog() {
  return (
    <div className={styles.container}>
      {blogPosts.map((post, index) => (
        <InfoCard key={index} header={post.title} subHeader={post.date}>
          {post.body}
        </InfoCard>
      ))}
    </div>
  );
}
