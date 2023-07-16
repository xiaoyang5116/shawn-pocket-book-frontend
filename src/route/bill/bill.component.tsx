import { useEffect, useState } from "react";
import { InfiniteScroll, List } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import BillItem from "../../components/bill-item/bill-item.component";
import { BillsListType } from "../../stores/bills.store";

import styles from "./bill.styles.module.scss";
// import { request } from "../../utils/axios.utils";

const Bill = () => {
  const [bills, setBills] = useState<BillsListType>([
    {
      bills: [
        {
          amount: 25.0,
          createTime: "2023-07-12T02:48:02.557Z",
          id: 911,
          pay_type: 2,
          remark: "吃饭",
          tagId: 1,
          tagName: "餐饮",
        },
        {
          amount: 25.0,
          createTime: "2023-07-12T02:48:02.557Z",
          id: 911,
          pay_type: 2,
          remark: "吃饭",
          tagId: 1,
          tagName: "餐饮",
        },
      ],
      date: "2021-06-11",
    },
  ]);
  const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   const billList = getBills()

  //   setBills();
  //   // console.log("billList", billList);
  // }, []);
  // async function loadMore() {
  //   // const append = await mockRequest();
  //   // setData((val) => [...val, ...append]);
  //   // setHasMore(append.length > 0);
  // }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pay_type}>
          <span>
            {`总支出: `}
            <span className={styles.price}>{`¥200`}</span>
          </span>
          <span className={styles.income}>
            {`总收入: `}
            <span className={styles.price}>{`¥200`}</span>
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
        {/* {billList.map((item, index) => {
          return <div key={item.date}>{item.date}</div>;
        })} */}
        <List>
          {bills.map((bill, index) => (
            <List.Item key={bill.date}>
              <BillItem bill={bill} />
            </List.Item>
          ))}
        </List>
        {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
      </div>
    </div>
  );
};

export default Bill;
