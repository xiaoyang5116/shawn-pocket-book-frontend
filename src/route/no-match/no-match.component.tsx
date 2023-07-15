import { ErrorBlock } from "antd-mobile";

import styles from "./no-match.styles.module.scss";

const NoMatch = () => {
  return (
    <div className={styles.container}>
      <ErrorBlock status="empty" />
    </div>
  );
};

export default NoMatch;
