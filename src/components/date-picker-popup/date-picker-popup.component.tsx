import dayjs from "dayjs";
import { forwardRef, useState, useImperativeHandle } from "react";
import { DatePicker } from "zarm";
import { useSetTime } from "../../stores/bills.store";

export type DatePickerPopupType = {
  DatePickerPopupShow: () => void;
};

const DatePickerPopup = forwardRef<DatePickerPopupType>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const setTime = useSetTime();

  useImperativeHandle(ref, () => {
    return {
      DatePickerPopupShow: () => setVisible(true),
    };
  });

  return (
    <DatePicker
      {...props}
      visible={visible}
      columnType={["year", "month"]}
      onConfirm={(value) => {
        const time = dayjs(value).format("YYYY-MM");
        setTime(time);
        setVisible(false);
      }}
      onCancel={() => setVisible(false)}
    />
  );
});

export default DatePickerPopup;
