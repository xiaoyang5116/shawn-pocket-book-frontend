import { forwardRef, useState, useImperativeHandle } from "react";
import { DatePicker } from "zarm";

export type DatePickerPopupType = {
  show: () => void;
  close: () => void;
};

type DatePickerProps = {
  setTime: (item: string) => void;
  closeCallback?: () => void;
  defaultValue?: Date;
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
  ({ setTime, columnType, closeCallback, defaultValue }, ref) => {
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
        defaultValue={defaultValue ? defaultValue : undefined}
        onConfirm={(value) => {
          setTime(value.toLocaleString());
          closeHandler();
        }}
        onCancel={closeHandler}
      />
    );
  }
);

export default DatePickerPopup;
