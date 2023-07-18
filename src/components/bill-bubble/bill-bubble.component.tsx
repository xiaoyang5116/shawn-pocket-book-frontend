import { EditSOutline } from "antd-mobile-icons";
import { FloatingBubble } from "antd-mobile";
import {
  useBillBubbleOffset,
  useSetBillBubbleOffset,
} from "../../stores/bubble.store";

import styles from "./bill-bubble.styles.module.scss";

type BillBubbleProps = {
  onClick: () => void;
};

const BillBubble = ({ onClick }: BillBubbleProps) => {
  const offset = useBillBubbleOffset();
  const setOffset = useSetBillBubbleOffset();

  return (
    <FloatingBubble
      axis="xy"
      magnetic="x"
      defaultOffset={offset}
      onOffsetChange={(offset) => setOffset(offset)}
      className={styles.bubble}
      onClick={onClick}
    >
      <EditSOutline />
    </FloatingBubble>
  );
};

export default BillBubble;
