import { useEffect, useRef, useState } from "react";
import { InfiniteScroll, List, Result } from "antd-mobile";
import { DownOutline, SmileOutline } from "antd-mobile-icons";
import BillItem from "../../components/bill-item/bill-item.component";
import { useBills, useGetDefaultBills } from "../../stores/bills.store";

import styles from "./bill.styles.module.scss";
import dayjs from "dayjs";

const Bill = () => {
  const bills = useBills();
  // const tagId = useBillsTagId();
  // const billsTime = useBillsTime();
  // const pullLoading = useBillsPullLoading();
  const getDefaultBills = useGetDefaultBills();
  const page = useRef(1);
  const [hasMore, setHasMore] = useState(true);

  const { list, totalExpense, totalIncome, totalPage } = bills;

  useEffect(() => {
    const currentTime = dayjs().format("YYYY-MM");
    getDefaultBills(currentTime);
  }, [getDefaultBills]);

  async function loadMore() {
    if (totalPage > page.current) {
      page.current += 1;
      // pullLoading(page.current);
    } else {
      setHasMore(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pay_type}>
          <span>
            {`总支出: `}
            <span className={styles.price}>{`¥${totalExpense.toFixed(
              2
            )}`}</span>
          </span>
          <span className={styles.income}>
            {`总收入: `}
            <span className={styles.price}>{`¥${totalIncome.toFixed(2)}`}</span>
          </span>
        </div>
        <div className={styles.type}>
          <span className={styles.tag}>
            {`全部类型`}
            <DownOutline />
          </span>
          <span className={styles.time}>
            {`2023-07`}
            <DownOutline />
          </span>
        </div>
      </div>
      <div className={styles.main}>
        {list.length > 0 ? (
          <>
            <List>
              {list.map((bill) => (
                <List.Item key={bill.date}>
                  <BillItem bill={bill} />
                </List.Item>
              ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
          </>
        ) : (
          <Result
            icon={<SmileOutline />}
            status="success"
            title="欢迎来到 shawn 记账本"
            description="目前还没有账单，来记一笔吧！"
          />
        )}
      </div>
    </div>
  );
};

export default Bill;
