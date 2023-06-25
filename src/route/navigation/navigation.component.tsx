import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer.component";

import styles from "./navigation.module.scss";

const Navigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Navigation;
