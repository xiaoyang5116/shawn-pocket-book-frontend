import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Popup, Toast, NumberKeyboard } from "antd-mobile";
import { CloseOutline, DownOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import DatePickerPopup, {
  DatePickerPopupType,
} from "../date-picker-popup/date-picker-popup.component";

import styles from "./bill-add-popup.styles.module.scss";
import { useTags } from "../../stores/tag.store";
import TagIcon from "../tag-icon/tag-icon.component";

export type BillAddPopupType = {
  billAddPopupShow: () => void;
};

const BillAddPopup = forwardRef<BillAddPopupType>((props, ref) => {
  const tas = useTags();
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(dayjs().format("MM-DD"));
  const [tagsIndex, setTagsIndex] = useState(1);
  const [pay_type, setPay_type] = useState(1);
  const [amount, setAmount] = useState("");
  const [keyboardIsShow, setKeyboardIsShow] = useState(true);
  const datePickerPopupRef = useRef<DatePickerPopupType>(null);

  const tasDate = tas.find((item) => item.pay_type === pay_type)?.tags;

  const closeHandler = () => {
    setVisible(false);
    setKeyboardIsShow(false);
  };
  const defaultShowHandler = () => {
    setVisible(true);
    setKeyboardIsShow(true);
  };

  const amountHandler = (value: string) => {
    console.log("111");
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

  const billAddHandler = () => {
    console.log("sss");
  };

  useImperativeHandle(ref, () => {
    return {
      billAddPopupShow: defaultShowHandler,
    };
  });

  return (
    <Popup
      visible={visible}
      onClose={closeHandler}
      onMaskClick={closeHandler}
      {...props}
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
              onClick={() => setPay_type(1)}
            >
              支出
            </span>
            <span
              className={
                pay_type === 2 ? styles.pay_type_active : styles.pay_type
              }
              onClick={() => setPay_type(2)}
            >
              收入
            </span>
          </div>
          <span className={styles.timeContainer} onClick={datePickerPopupShow}>
            {time}
            <DownOutline className={styles.icon} />
          </span>
          {/* <span className={style.pay_type}>不计入</span> */}
        </div>
        <div className={styles.amountContainer}>
          <span className={styles.amountIcon}>¥</span>
          <input
            type="text"
            className={styles.input}
            value={amount}
            readOnly={true}
          />
        </div>

        <div className={styles.tagContainer}>
          {tasDate?.map((tag, index) => {
            const { id, name } = tag;
            return (
              <div
                key={id}
                className={index === tagsIndex ? styles.tag_active : styles.tag}
                onClick={() => setTagsIndex(index)}
              >
                <TagIcon id={id as number} />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
        <NumberKeyboard
          visible={keyboardIsShow}
          onDelete={deleteHandler}
          showCloseButton={false}
          onInput={amountHandler}
          customKey={"."}
          confirmText="确定"
          onConfirm={billAddHandler}
        />
      </div>
      <DatePickerPopup
        ref={datePickerPopupRef}
        setTime={setTime}
        format={"MM-DD"}
        columnType={["month", "day"]}
        closeCallback={() => setKeyboardIsShow(true)}
      />
    </Popup>
  );
});

export default BillAddPopup;
