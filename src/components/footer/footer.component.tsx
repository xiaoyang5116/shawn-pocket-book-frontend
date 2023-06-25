import { TabBar, Badge } from "antd-mobile";
import { BillOutline, HistogramOutline, UserOutline } from "antd-mobile-icons";

const Footer = () => {
  return (
    <div style={{ background: "#1677ff" }}>
      <TabBar>
        <TabBar.Item
          key={"账单"}
          icon={<BillOutline />}
          title={"账单"}
          badge={Badge.dot}
        />
        <TabBar.Item
          key={"统计"}
          icon={<HistogramOutline />}
          title={"统计"}
          badge={Badge.dot}
        />
        <TabBar.Item
          key={"我的"}
          icon={<UserOutline />}
          title={"我的"}
          badge={Badge.dot}
        />
      </TabBar>
    </div>
  );
};

export default Footer;
