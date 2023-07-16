import { useEffect, useRef, useState } from "react";
import { InfiniteScroll, List, Result, PullToRefresh } from "antd-mobile";
import { DownOutline, SmileOutline } from "antd-mobile-icons";
import { PullStatus } from "antd-mobile/es/components/pull-to-refresh";
import BillItem from "../../components/bill-item/bill-item.component";
import {
  useBills,
  useGetDefaultBills,
  usePullUpLoading,
  useTotalExpense,
  useTotalIncome,
  useTotalPage,
} from "../../stores/bills.store";
import dayjs from "dayjs";

import styles from "./bill.styles.module.scss";

const statusRecord: Record<PullStatus, string> = {
  pulling: "用力拉",
  canRelease: "松开吧",
  refreshing: "玩命加载中...",
  complete: "好啦",
};

const Bill = () => {
  const bills = useBills();
  const totalExpense = useTotalExpense();
  const totalIncome = useTotalIncome();
  const totalPage = useTotalPage();
  const page = useRef(1);
  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format("YYYY-MM")
  );
  const [currentTagId, setCurrentTagId] = useState<number | "all">("all");
  const [hasMore, setHasMore] = useState(true);

  const getDefaultBills = useGetDefaultBills();
  const pullUpLoading = usePullUpLoading();
  const pullDownRefresh = async () => {
    getDefaultBills({ date: currentTime, tagId: currentTagId });
    page.current = 1;
    setHasMore(true);
  };

  useEffect(() => {
    getDefaultBills({ date: currentTime, tagId: currentTagId });
  }, [getDefaultBills, currentTime, currentTagId]);

  async function loadMore() {
    if (totalPage > page.current) {
      page.current += 1;
      pullUpLoading({
        date: currentTime,
        tagId: currentTagId,
        page: page.current,
      });
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
        <PullToRefresh
          onRefresh={pullDownRefresh}
          renderText={(status) => {
            return <div>{statusRecord[status]}</div>;
          }}
        >
          {bills.length > 0 ? (
            <>
              <List>
                {bills.map((bill) => (
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
        </PullToRefresh>
      </div>
    </div>
  );
};

export default Bill;
