import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Popup, Toast, NumberKeyboard, TextArea } from "antd-mobile";
import { CloseOutline, DownOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import DatePickerPopup, {
  DatePickerPopupType,
} from "../date-picker-popup/date-picker-popup.component";

import styles from "./bill-add-popup.styles.module.scss";
import { useTags } from "../../stores/tag.store";
import TagIcon from "../tag-icon/tag-icon.component";
import { useAddBill } from "../../stores/bills.store";

export type BillAddPopupType = {
  billAddPopupShow: () => void;
};

type BillAddPopupProps = {
  refreshHandler?: () => void;
};

const BillAddPopup = forwardRef<BillAddPopupType, BillAddPopupProps>(
  ({ refreshHandler }, ref) => {
    const tas = useTags();
    const addBill = useAddBill();
    const [visible, setVisible] = useState(false);
    const [time, setTime] = useState(dayjs().toDate().toLocaleDateString());
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
      const currTime = dayjs().toDate();
      const createTime = dayjs(time)
        .toDate()
        .setHours(
          currTime.getHours(),
          currTime.getMinutes(),
          currTime.getSeconds()
        );

      if (amount) {
        await addBill({
          amount: +amount,
          remark: remark,
          createTime: dayjs(createTime).toDate().toJSON(),
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
        setTime(currTime.toLocaleDateString());
        closeHandler();
      } else {
        Toast.show("请输入金额");
      }
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
            </div>
            <span
              className={styles.timeContainer}
              onClick={datePickerPopupShow}
            >
              {formatTime}
              <DownOutline className={styles.icon} />
            </span>
            {/* <span className={style.pay_type}>不计入</span> */}
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
            onConfirm={billAddHandler}
          />
        </div>
        <DatePickerPopup
          ref={datePickerPopupRef}
          setTime={setTime}
          columnType={["month", "day"]}
          closeCallback={() => setKeyboardIsShow(true)}
        />
      </Popup>
    );
  }
);

export default BillAddPopup;
