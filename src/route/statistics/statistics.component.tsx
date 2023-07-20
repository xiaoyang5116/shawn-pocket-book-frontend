import { useEffect, useRef, useState } from "react";
import { CalendarOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import classNames from "classnames";
import DatePickerPopup, {
  DatePickerPopupType,
} from "../../components/date-picker-popup/date-picker-popup.component";
import { GetBillDataType, useGetBillDate } from "../../stores/bills.store";
import TagIcon from "../../components/tag-icon/tag-icon.component";
import { ProgressBar } from "antd-mobile";

import styles from "./statistics.styles.module.scss";

const Statistics = () => {
  const getBillDate = useGetBillDate();
  const [currentTime, setCurrentTime] = useState(dayjs().toDate().toString());
  const [currentPayType, setCurrentPayType] = useState(1);
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  // 支出数据
  const [expenseData, setExpenseData] = useState<GetBillDataType["total_data"]>(
    []
  );
  // 收入数据
  const [incomeData, setIncomeData] = useState<GetBillDataType["total_data"]>(
    []
  );

  const datePickerPopupRef = useRef<DatePickerPopupType>(null);

  const datePickerPopupShow = () => datePickerPopupRef.current?.show();

  useEffect(() => {
    getBillDate(dayjs(currentTime).format("YYYY-MM")).then((result) => {
      // 过滤支出和收入
      const expense_data = result.total_data
        .filter((item) => item.pay_type == 1)
        .sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
      const income_data = result.total_data
        .filter((item) => item.pay_type == 2)
        .sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
      setExpenseData(expense_data);
      setIncomeData(income_data);
      // 总收支
      setTotalExpense(result.total_expense);
      setTotalIncome(result.total_income);
    });
  }, [getBillDate, currentTime]);

  return (
    <div className={styles.container}>
      <div className={classNames({ [styles.headContainer]: true })}>
        <div className={styles.timeContainer}>
          <div className={styles.time} onClick={datePickerPopupShow}>
            <span>{dayjs(currentTime).format("YYYY-MM")}</span>
            <CalendarOutline />
          </div>
          <div className={styles.payTypeContainer}>
            <span
              className={classNames({ [styles.payType]: currentPayType === 1 })}
              onClick={() => setCurrentPayType(1)}
            >
              支出
            </span>
            <span
              className={classNames({ [styles.payType]: currentPayType === 2 })}
              onClick={() => setCurrentPayType(2)}
            >
              收入
            </span>
          </div>
        </div>
        <div className={styles.payTypeTitle}>
          {currentPayType === 1 ? "共支出" : "共收入"}
        </div>
        <div className={styles.amount}>{`¥ ${
          currentPayType === 1 ? totalExpense : totalIncome
        }`}</div>
      </div>

      <div className={styles.billItemContainer}>
        {(currentPayType === 1 ? expenseData : incomeData).map((item) => {
          const { tagId, tagName, number } = item;
          return (
            <div key={tagId} className={styles.billItem}>
              <div className={styles.left}>
                <TagIcon id={tagId} />
                <span className={styles.tagName}>{tagName}</span>
                <span className={styles.tagName}>¥{number.toFixed(2)}</span>
              </div>

              <div className={styles.progressBar}>
                <ProgressBar
                  text
                  percent={Number(
                    (
                      (number /
                        Number(
                          currentPayType == 1 ? totalExpense : totalIncome
                        )) *
                      100
                    ).toFixed(2)
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      <DatePickerPopup
        ref={datePickerPopupRef}
        setTime={setCurrentTime}
        columnType={["year", "month"]}
        defaultValue={dayjs(currentTime).toDate()}
      />
    </div>
  );
};

export default Statistics;
