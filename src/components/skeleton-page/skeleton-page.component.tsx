import { Skeleton } from "antd-mobile";

import styles from "./skeleton-page.styles.module.scss";

const SkeletonPage = () => {
  return (
    <div className={styles.container}>
      <Skeleton animated className={styles.customSkeleton} />
      <Skeleton.Title animated className={styles.title} />
      <Skeleton.Title animated className={styles.title} />
      <Skeleton.Title animated className={styles.title} />
      <Skeleton animated className={styles.footer} />
    </div>
  );
};

export default SkeletonPage;
