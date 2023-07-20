import { useState } from "react";
import { CalendarOutline } from "antd-mobile-icons";
import dayjs from "dayjs";

import styles from "./statistics.styles.module.scss";

const Statistics = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM"));
  const [currentPayType, setCurrentPayType] = useState(1);
  const total_expense = 1000;
  const total_income = 2000;

  return (
    <div className={styles.container}>
      <div className={styles.timeContainer}>
        <div>
          <span>{currentTime}</span>
          <CalendarOutline />
        </div>
        <div>
          <span>支出</span>
          <span>收入</span>
        </div>
      </div>
      <div>{`共${currentPayType === 1 ? "支出" : "收入"}`}</div>
      <div>{`¥${total_expense.toFixed(2)}`}</div>
      <div>{`共收入${total_income.toFixed(2)}`}</div>
    </div>
  );
};

export default Statistics;
