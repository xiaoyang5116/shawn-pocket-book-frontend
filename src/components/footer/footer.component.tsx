import { TabBar, Badge } from "antd-mobile";
import { BillOutline, HistogramOutline, UserOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

import styles from "./footer.styles.module.scss";

const Footer = () => {
  const navigate = useNavigate();

  const navigationHandler = (key: string): void => {
    navigate(`/${key}`);
  };

  return (
    <div className={`safeArea-container ${styles.container}`}>
      <TabBar onChange={navigationHandler}>
        <TabBar.Item
          key={""}
          icon={<BillOutline />}
          title={"账单"}
          badge={Badge.dot}
        />
        <TabBar.Item
          key={"statistics"}
          icon={<HistogramOutline />}
          title={"统计"}
          badge={Badge.dot}
        />
        <TabBar.Item
          key={"user"}
          icon={<UserOutline />}
          title={"我的"}
          badge={Badge.dot}
        />
      </TabBar>
    </div>
  );
};

export default Footer;
