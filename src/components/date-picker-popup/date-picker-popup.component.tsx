import dayjs from "dayjs";
import { forwardRef, useState, useImperativeHandle } from "react";
import { DatePicker } from "zarm";

export type DatePickerPopupType = {
  show: () => void;
  close: () => void;
};

type DatePickerProps = {
  setTime: (item: string) => void;
  format: "YYYY-MM" | "MM-DD";
  closeCallback?: () => void;
  columnType: (
    | "year"
    | "month"
    | "day"
    | "meridiem"
    | "hour"
    | "minute"
    | "second"
    | "week"
    | "week-day"
  )[];
};

const DatePickerPopup = forwardRef<DatePickerPopupType, DatePickerProps>(
  ({ setTime, columnType, format, closeCallback }, ref) => {
    const [visible, setVisible] = useState(false);

    const closeHandler = () => {
      setVisible(false);
      if (closeCallback) {
        closeCallback();
      }
    };

    useImperativeHandle(ref, () => {
      return {
        show: () => setVisible(true),
        close: () => {
          setVisible(false);
          if (closeCallback) {
            closeCallback();
          }
        },
      };
    });

    return (
      <DatePicker
        visible={visible}
        columnType={columnType}
        onConfirm={(value) => {
          const time = dayjs(value).format(format);
          setTime(time);
          closeHandler();
        }}
        onCancel={closeHandler}
      />
    );
  }
);

export default DatePickerPopup;
