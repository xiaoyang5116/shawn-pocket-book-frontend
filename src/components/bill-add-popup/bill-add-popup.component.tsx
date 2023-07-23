import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Popup, Toast, NumberKeyboard, TextArea } from "antd-mobile";
import { CloseOutline, DownOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import DatePickerPopup, {
  DatePickerPopupType,
} from "../date-picker-popup/date-picker-popup.component";
import { useTags } from "../../stores/tag.store";
import TagIcon from "../tag-icon/tag-icon.component";
import { BillType, useAddBill, useUpdateBill } from "../../stores/bills.store";

import styles from "./bill-add-popup.styles.module.scss";

export type BillAddPopupType = {
  show: () => void;
};

type BillAddPopupProps = {
  refreshHandler?: (bill?: BillType) => void;
  billDetail?: BillType;
};

const BillAddPopup = forwardRef<BillAddPopupType, BillAddPopupProps>(
  ({ refreshHandler, billDetail }, ref) => {
    const tas = useTags();
    const addBill = useAddBill();
    const updateBill = useUpdateBill();
    const [visible, setVisible] = useState(false);
    const [time, setTime] = useState(dayjs().toDate().toString());
    const [tagsIndex, setTagsIndex] = useState(0);
    const [pay_type, setPay_type] = useState(1);
    const [amount, setAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [remarkShow, setRemarkShow] = useState(false);
    const [keyboardIsShow, setKeyboardIsShow] = useState(true);
    const datePickerPopupRef = useRef<DatePickerPopupType>(null);

    const formatTime = dayjs(time).format("MM-DD");
    const tasDate = tas.find((item) => item.pay_type === pay_type)?.tags;

    const closeHandler = () => {
      setVisible(false);
      setKeyboardIsShow(false);
    };
    const defaultShowHandler = () => {
      setVisible(true);
      setKeyboardIsShow(true);
    };

    const togglePayType = (id: number) => {
      setPay_type(id);
      setTagsIndex(0);
    };

    const amountHandler = (value: string) => {
      if (value === "." && amount === "") {
        return setAmount("0.");
      }

      if (amount.split(".")[1] && amount.split(".")[1].length >= 2) {
        return;
      }

      if (Number(amount + value) > 999999.99) {
        Toast.show({
          content: (
            <div style={{ textAlign: "center" }}>
              输入金额不能大于
              <br />
              1,000,000
            </div>
          ),
        });
      } else {
        setAmount(amount + value);
      }
    };

    const deleteHandler = () => {
      setAmount((amount) => amount.slice(0, -1));
    };

    const datePickerPopupShow = () => {
      setKeyboardIsShow(false);
      datePickerPopupRef.current?.show();
    };

    const billAddHandler = async () => {
      const currTime = dayjs();
      const isAfter = dayjs(time).isAfter(currTime);

      let createTime;

      if (isAfter) {
        createTime = dayjs(time)
          .toDate()
          .setHours(
            currTime.toDate().getHours(),
            currTime.toDate().getMinutes(),
            currTime.toDate().getSeconds()
          );
      } else {
        if (
          dayjs(time).format("YYYY-MM-DD") === currTime.format("YYYY-MM-DD")
        ) {
          createTime = dayjs(time)
            .toDate()
            .setHours(
              currTime.toDate().getHours(),
              currTime.toDate().getMinutes(),
              currTime.toDate().getSeconds()
            );
        } else {
          createTime = dayjs(time).toDate().setHours(23, 59, 59);
        }
      }

      await addBill({
        amount: +amount,
        remark: remark,
        createTime: dayjs(createTime).toJSON(),
        tagId: tas.find((item) => item.pay_type === pay_type)?.tags[tagsIndex]
          .id as number,
      }).then(() => {
        if (refreshHandler) {
          refreshHandler();
        }
      });

      setTagsIndex(0);
      setPay_type(1);
      setAmount("");
      setRemark("");
      setTime(dayjs().toDate().toJSON());
      closeHandler();
    };

    const updateBillHandler = async () => {
      const currTime = dayjs(time);
      const preTime = dayjs(billDetail?.createTime);
      const isAfter = preTime.isAfter(currTime);

      let createTime;

      if (
        currTime.format("YYYY-MM-DD") ===
        dayjs(billDetail?.createTime).format("YYYY-MM-DD")
      ) {
        createTime = dayjs(billDetail?.createTime).toJSON();
      } else {
        if (isAfter) {
          createTime = currTime.toDate().setHours(23.59, 59);
        } else {
          createTime = currTime
            .toDate()
            .setHours(
              currTime.toDate().getHours(),
              currTime.toDate().getMinutes(),
              currTime.toDate().getSeconds()
            );
        }
      }

      await updateBill(billDetail?.id as number, {
        amount: +amount,
        remark: remark,
        tagId: tas.find((item) => item.pay_type === pay_type)?.tags[tagsIndex]
          .id as number,
        createTime: createTime as string,
      }).then((date) => {
        if (refreshHandler) {
          refreshHandler(date);
          closeHandler();
        }
      });
    };

    const confirmHandler = () => {
      if (amount) {
        if (billDetail && billDetail.id) {
          updateBillHandler();
        } else {
          billAddHandler();
        }
      } else {
        Toast.show("请输入金额");
      }
    };

    useEffect(() => {
      if (billDetail && billDetail.id) {
        const tagsIndex = tas
          .find((item) => item.pay_type === billDetail.pay_type)
          ?.tags.findIndex((item) => item.id === billDetail.tagId);

        setTime(billDetail.createTime);
        setPay_type(billDetail.pay_type);
        setTagsIndex(tagsIndex as number);
        setAmount(billDetail.amount.toString());
        setRemark(billDetail.remark);
      }
    }, [billDetail, tas]);

    useImperativeHandle(ref, () => {
      return {
        show: defaultShowHandler,
      };
    });

    return (
      <Popup
        visible={visible}
        onClose={closeHandler}
        onMaskClick={closeHandler}
      >
        <div className={styles.container}>
          <div className={styles.closeIconContainer}>
            <CloseOutline onClick={closeHandler} className={styles.closeIcon} />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.pay_typeContainer}>
              <span
                className={
                  pay_type === 1 ? styles.pay_type_active : styles.pay_type
                }
                onClick={() => togglePayType(1)}
              >
                支出
              </span>
              <span
                className={
                  pay_type === 2 ? styles.pay_type_active : styles.pay_type
                }
                onClick={() => togglePayType(2)}
              >
                收入
              </span>
              <span
                className={
                  pay_type === 0 ? styles.pay_type_active : styles.pay_type
                }
                onClick={() => togglePayType(0)}
              >
                不计入收支
              </span>
            </div>
            <span
              className={styles.timeContainer}
              onClick={datePickerPopupShow}
            >
              {formatTime}
              <DownOutline className={styles.icon} />
            </span>
          </div>
          <div className={styles.amountContainer}>
            <span className={styles.amountIcon}>¥</span>
            <span className={styles.input}>{amount}</span>
          </div>

          <div className={styles.tagContainer}>
            {tasDate?.map((tag, index) => {
              const { id, name } = tag;
              return (
                <div
                  key={id}
                  className={
                    index === tagsIndex ? styles.tag_active : styles.tag
                  }
                  onClick={() => setTagsIndex(index)}
                >
                  <TagIcon id={id as number} />
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.remarkContainer}>
            {remarkShow ? (
              <TextArea
                placeholder="请输入备注信息"
                defaultValue={remark}
                onChange={(val) => setRemark(val)}
                showCount
                maxLength={30}
                onBlur={() => setRemarkShow(false)}
                className={styles.text}
              />
            ) : (
              <span onClick={() => setRemarkShow(true)}>
                {remark || "添加备注"}
              </span>
            )}
          </div>
          <NumberKeyboard
            visible={keyboardIsShow}
            onDelete={deleteHandler}
            showCloseButton={false}
            onInput={amountHandler}
            customKey={"."}
            confirmText="确定"
            onConfirm={confirmHandler}
          />
        </div>
        <DatePickerPopup
          ref={datePickerPopupRef}
          defaultValue={dayjs(time).toDate()}
          setTime={setTime}
          columnType={["year", "month", "day"]}
          closeCallback={() => setKeyboardIsShow(true)}
        />
      </Popup>
    );
  }
);

export default BillAddPopup;
