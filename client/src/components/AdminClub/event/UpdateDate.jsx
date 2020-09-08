import React, { Fragment, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

export const UpdateDate = (props) => {
  console.log("startTime", props.data.startTime);
  console.log("endtime", props.data.endTime);

  function onChange(dates, dateStrings) {
    // setTime({ ...dateStrings });
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    props.onChangeDatePick([...dateStrings]);
  }

  return (
    <Fragment>
      <RangePicker
        // ranges={{
        //   Today: [moment(), moment()],
        //   "This Month": [moment().startOf("month"), moment().endOf("month")],
        // }}
        defaultValue={[
          moment(`${props.data.startTime}`, "DD-MM-YYYY  HH:mm"),
          moment(`${props.data.endTime}`, "DD-MM-YYYY  HH:mm"),
        ]}
        showTime
        format="DD/MM/YYYY HH:mm"
        onChange={onChange}
      />
    </Fragment>
  );
};
