import { useEffect, useState } from "react";
import { BillType, BillsType, Pay_Type } from "../../stores/bills.store";
import TagIcon from "../tag-icon/tag-icon.component";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import styles from "./bill-item.styles.module.scss";

type BillItemProps = {
  bill: BillsType;
};

const Amount = ({ item }: { item: BillType }) => {
  const amount = item.amount.toFixed(2);
  switch (item.pay_type) {
    case 0:
      return <span className={styles.amount_0}>{amount}</span>;
    case 1:
      return <span className={styles.amount_1}>-{amount}</span>;
    case 2:
      return <span className={styles.amount_2}>+{amount}</span>;
    default:
      return <span className={styles.amount_0}>{amount}</span>;
  }
};

const BillItem = ({ bill }: BillItemProps) => {
  const { bills, date } = bill;
  const navigate = useNavigate();
  const [dayExpense, setDayExpense] = useState(0); // 天支出
  const [dayIncome, setDayIncome] = useState(0); // 天收入

  const billDetail = (bill: BillType) => {
    navigate(`/detail/${bill.id}`, { state: bill });
  };

  useEffect(() => {
    // 初始化将传入的 bill 内的 bills 数组内数据项，过滤出支出和收入。
    // pay_type：1 为支出；2 为收入
    // 通过 reduce 累加
    const currentDayExpense = bills
      .filter((item) => item.pay_type === Pay_Type["支出"])
      .reduce((curr, item) => (curr += item.amount), 0);
    setDayExpense(currentDayExpense);

    const currentDayIncome = bills
      .filter((item) => item.pay_type === Pay_Type["收入"])
      .reduce((curr, item) => (curr += item.amount), 0);
    setDayIncome(currentDayIncome);
  }, [bills]);

  return (
    <div className={styles.billContainer}>
      <div className={styles.dayContainer}>
        <div className={styles.date}>{date}</div>
        <div className={styles.ExpenseContainer}>
          <span>支: ¥{dayExpense.toFixed(2)}</span>
          <span className={styles.dayIncome}>收: ¥{dayIncome.toFixed(2)}</span>
        </div>
      </div>
      {bills
        .sort((a, b) => dayjs(b.createTime).unix() - dayjs(a.createTime).unix())
        .map((item) => {
          const { id, tagId, tagName, createTime, remark } = item;
          return (
            <div
              key={id}
              className={styles.billItem}
              onClick={() => billDetail(item)}
            >
              <TagIcon id={tagId} />
              <div className={styles.content}>
                <div className={styles.amountContainer}>
                  <span className={styles.tagName}>{tagName}</span>
                  <Amount item={item} />
                </div>
                <div className={styles.time}>
                  <span>{dayjs(createTime).format("HH:mm")}</span>
                  {remark ? <span>{` ｜ ${remark}`}</span> : null}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BillItem;
