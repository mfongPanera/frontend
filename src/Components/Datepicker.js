import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker  from "react-datepicker"
import { useSelector, useDispatch } from "react-redux";
import {
  updateDataForSelectedDate,
  setInstructions,
  clearSelectedData
} from "../app/dataReducer";
import "./../Styles/datepicker.css";
import { addDays } from "date-fns";

function Datepicker() {
  const shop = "Panera";
  const dates = useSelector((state) => state.dataReducer.dates);
  const selectedDate = useSelector((state) => state.dataReducer.selectedDate);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("SELECTED DATA: ",selectedDate.toLocaleDateString("en-US"));
    //dispatch(changeDetailedDate(dates.min()))
  }, [selectedDate]);

  const fetchAllDataForSelectedDate = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get_inventory_data/${date
          .toLocaleDateString("en-US")
          .replaceAll("/", "-")}`
      );
      const requestedData = await response.json();
      dispatch(
        updateDataForSelectedDate({
          selectedDate: date,
          requestedData: requestedData,
          selectedEndDate: null,
        })
      );
      dispatch(clearSelectedData());
      dispatch(setInstructions("PLEASE SELECT A LOCATION"))
    } catch (err) {
      console.log("error occurred")
      console.error(err.message);
    }
  };
  return (
    <div>
      <DatePicker
        dayClassName={(date) => {
          return `${shop}_datepicker_day`;
        }}
        calendarClassName={`${shop}_datepicker`}
        className={`${shop}_datepicker_input`}
        onChange={(date) => fetchAllDataForSelectedDate(date)}
        selected={selectedDate}
        dateFormat={"MM-dd-yyyy"}
        placeholderText="SELECT DATE"
        includeDates={dates ? dates : null}
        showIcon
      />
    </div>
  );
}

export default Datepicker;
