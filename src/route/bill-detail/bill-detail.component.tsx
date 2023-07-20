import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/header.component";
import { BillType, useDeleteBill } from "../../stores/bills.store";
import dayjs from "dayjs";
import TagIcon from "../../components/tag-icon/tag-icon.component";
import { DeleteOutline, FillinOutline } from "antd-mobile-icons";
import { Dialog } from "antd-mobile";
import BillAddPopup, {
  BillAddPopupType,
} from "../../components/bill-add-popup/bill-add-popup.component";

import styles from "./bill-detail.styles.module.scss";

const BillDetail = () => {
  const { state } = useLocation() as { state: BillType };
  const navigate = useNavigate();
  const deleteBill = useDeleteBill();
  const billAddPopupRef = useRef<BillAddPopupType>(null);
  const [bill, setBill] = useState(state);

  const deleteHandler = () => {
    deleteBill(bill.id).then(() => navigate(-1));
  };

  const deleteConfirmDialog = () => {
    Dialog.show({
      content: "删除后无法恢复，是否删除？",
      closeOnAction: true,
      closeOnMaskClick: true,
      actions: [
        [
          {
            key: "cancel",
            text: "取消",
          },
          {
            key: "delete",
            text: "删除",
            danger: true,
            onClick: deleteHandler,
          },
        ],
      ],
    });
  };

  const refreshHandler = (date: BillType | undefined) => {
    if (date) {
      setBill(date);
    }
  };

  useEffect(() => {
    if (!bill) {
      navigate("/");
    }
  }, [bill, navigate]);

  if (!bill) return <></>;

  const { tagId, tagName, amount, createTime, remark, pay_type } = bill;

  return (
    <div className={styles.container}>
      <Header title="账单详情" />
      <div className={styles.billContainer}>
        <div className={styles.icon}>
          <TagIcon id={tagId} />
          <span>{tagName}</span>
        </div>
        <div className={styles.amount}>{`${
          pay_type === 1 ? "-" : "+"
        }${amount.toFixed(2)}`}</div>
        <div className={styles.time}>
          <div>记录时间</div>
          <div>{dayjs(createTime).format("YYYY年MM月DD日 HH:mm")}</div>
        </div>
        <div className={styles.time}>
          <div>备注</div>
          <div>{remark}</div>
        </div>
        <div className={styles.editor}>
          <div
            className={`${styles.item} ${styles.delete}`}
            onClick={deleteConfirmDialog}
          >
            <DeleteOutline />
            <span>删除</span>
          </div>
          <span>|</span>
          <div
            className={styles.item}
            onClick={() => billAddPopupRef.current?.show()}
          >
            <FillinOutline />
            <span>编辑</span>
          </div>
        </div>
      </div>
      <BillAddPopup
        ref={billAddPopupRef}
        billDetail={bill}
        refreshHandler={refreshHandler}
      />
    </div>
  );
};

export default BillDetail;
