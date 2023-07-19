import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteScroll, List, Result, PullToRefresh } from "antd-mobile";
import { DownOutline, SmileOutline } from "antd-mobile-icons";
import { PullStatus } from "antd-mobile/es/components/pull-to-refresh";
import BillItem from "../../components/bill-item/bill-item.component";
import {
  useBills,
  useCurrentTime,
  useSetTime,
  useGetDefaultBills,
  usePullUpLoading,
  useTotalExpense,
  useTotalIncome,
  useTotalPage,
} from "../../stores/bills.store";
import TagPopup, {
  TagPopupType,
} from "../../components/tag-popup/tag-popup.component";
import { useCurrentTag } from "../../stores/tag.store";
import DatePickerPopup, {
  DatePickerPopupType,
} from "../../components/date-picker-popup/date-picker-popup.component";
import BillBubble from "../../components/bill-bubble/bill-bubble.component";
import BillAddPopup, {
  BillAddPopupType,
} from "../../components/bill-add-popup/bill-add-popup.component";
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
  const currentTag = useCurrentTag();
  const currentTime = useCurrentTime();
  const setTime = useSetTime();
  const page = useRef(1);
  const tagPopupRef = useRef<TagPopupType>(null);
  const datePickerPopupRef = useRef<DatePickerPopupType>(null);
  const billAddPopupRef = useRef<BillAddPopupType>(null);
  const [hasMore, setHasMore] = useState(true);

  const formatTime = dayjs(currentTime).format("YYYY-MM");

  const getDefaultBills = useGetDefaultBills();
  const pullUpLoading = usePullUpLoading();

  const refreshHandler = useCallback(() => {
    getDefaultBills({ date: formatTime, tagId: currentTag.id });
  }, [getDefaultBills, formatTime, currentTag]);

  const pullDownRefresh = async () => {
    refreshHandler();
    page.current = 1;
    setHasMore(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [refreshHandler]);

  async function loadMore() {
    if (totalPage > page.current) {
      page.current += 1;
      pullUpLoading({
        date: formatTime,
        tagId: currentTag.id,
        page: page.current,
      });
    } else {
      setHasMore(false);
    }
  }

  const tagPopupShow = () => tagPopupRef.current?.tapPopupShow();
  const datePickerPopupShow = () => datePickerPopupRef.current?.show();
  const billAddPopupShow = () => billAddPopupRef.current?.billAddPopupShow();

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
          <span className={styles.tag} onClick={tagPopupShow}>
            {currentTag.name}
            <DownOutline className={styles.icon} />
          </span>
          <span className={styles.time} onClick={datePickerPopupShow}>
            {formatTime}
            <DownOutline className={styles.icon} />
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
                {bills.map((bill, index) => (
                  <List.Item key={bill.date + index}>
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
      <TagPopup ref={tagPopupRef} />
      <DatePickerPopup
        ref={datePickerPopupRef}
        setTime={setTime}
        columnType={["year", "month"]}
      />
      <BillBubble onClick={billAddPopupShow} />
      <BillAddPopup ref={billAddPopupRef} refreshHandler={refreshHandler} />
    </div>
  );
};

export default Bill;
