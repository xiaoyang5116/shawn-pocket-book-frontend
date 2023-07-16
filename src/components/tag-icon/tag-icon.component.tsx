import {
  GiftOutline,
  ShopbagOutline,
  TruckOutline,
  CalendarOutline,
} from "antd-mobile-icons";

import styles from "./tag-icon.styles.module.scss";

const TagIcon = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return <GiftOutline className={styles.icon} />;
    case 2:
      return <ShopbagOutline />;
    case 3:
      return <TruckOutline />;
    default:
      return <CalendarOutline />;
  }
};

export default TagIcon;
