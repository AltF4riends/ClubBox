// TimePicker.tsx
import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TimePicker.css";

interface TimePickerProps extends Omit<ReactDatePickerProps, "value"> {
  value: Date | null | string;
  onChange: (date: Date | null) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleTimeChange = (time: Date | null) => {
    onChange(time);
  };

  return (
    <DatePicker
      selected={typeof value === "string" ? null : value}
      onChange={handleTimeChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      timeCaption="Time"
      {...props}
    />
  );
};

export default TimePicker;
