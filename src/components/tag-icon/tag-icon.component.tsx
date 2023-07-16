import {
  GiftOutline,
  ShopbagOutline,
  TruckOutline,
  CalendarOutline,
} from "antd-mobile-icons";

const TagIcon = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return <GiftOutline />;
    case 2:
      return <ShopbagOutline />;
    case 3:
      return <TruckOutline />;
    default:
      return <CalendarOutline />;
  }
};

export default TagIcon;
