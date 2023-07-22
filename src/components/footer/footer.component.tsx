import { TabBar } from "antd-mobile";
import { BillOutline, PieOutline, UserOutline } from "antd-mobile-icons";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./footer.styles.module.scss";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationHandler = (key: string): void => {
    navigate(`${key}`);
  };

  return (
    <div className={`safeArea-container ${styles.container}`}>
      <TabBar activeKey={location.pathname} onChange={navigationHandler}>
        <TabBar.Item
          key={"/"}
          icon={<BillOutline />}
          title={"账单"}
          // badge={Badge.dot}
        />
        <TabBar.Item
          key={"/statistics"}
          icon={<PieOutline />}
          title={"统计"}
          // badge={Badge.dot}
        />
        <TabBar.Item
          key={"/user"}
          icon={<UserOutline />}
          title={"我的"}
          // badge={Badge.dot}
        />
      </TabBar>
    </div>
  );
};

export default Footer;
