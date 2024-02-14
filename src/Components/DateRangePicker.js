import React, { useEffect, useState, useRef } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { addDays } from "date-fns";
import { useDispatch } from "react-redux";
import {
  updateDataForSelectedDate,
  setInstructions,
  clearSelectedData
} from "../app/dataReducer";
import styles from "./../Styles/dateRangePicker.module.css";

function DateRangePicker() {
  const shop = 'Panera'
  const [dateRange, setRange] = useState([
        {
            startDate: null,
            endDate: null,
            key : 'selection'
        }
  ])
  const dispatch = useDispatch()
  const [openDateRange, setOpenDateRange] = useState(false)  
  const [inputValue, setInputValue] = useState("SELECT DATES")
  const fetchDataForDateRange = async (item) => {
    try {
      if(item.startDate != null && item.endDate != null ) {
        const startDate = item.startDate.toLocaleDateString("en-US").replaceAll("/","-")
        const endDate = item.endDate.toLocaleDateString("en-US").replaceAll("/","-")
        const response = await fetch(
          `http://localhost:5000/get_inventory_data_for_date_range/${startDate}/${endDate}`
        );
        const requestedData = await response.json();
        const sortedData = requestedData.map((data) => {
          return {...data, created_date: new Date(data.created_date)}
        }).sort((a,b)=>a.created_date - b.created_date)
        dispatch(
          updateDataForSelectedDate({
            selectedDate: startDate,
            requestedData: sortedData,
            selectedEndDate: endDate,
          })
        );
        dispatch(clearSelectedData());
        dispatch(setInstructions("PLEASE SELECT A LOCATION"))
      }
    } catch (err) {
      console.log("error occurred")
      console.error(err.message);
    }
  } 
  const handleOpenDateRange = () => {
    setOpenDateRange((openDateRange) => !openDateRange)
  }

  const refOne = useRef(null)

  useEffect(()=>{
    document.addEventListener("keydown",hideOnEscape,true)
    document.addEventListener("click", hideOnClickOutSide,true)
  })

  useEffect(()=>{
    fetchDataForDateRange(dateRange[0])
    if(dateRange[0].startDate!=null && dateRange[0].endDate!=null) {
    var value1 = dateRange[0].startDate.toLocaleDateString("en-US").replaceAll("/","-")
    var value2 = dateRange[0].endDate.toLocaleDateString("en-US").replaceAll("/","-")
    var input = value1+ " to "+value2 
    setInputValue(input)
    }
  },[dateRange])

  const hideOnEscape = (e) => {
    if(e.key === "Escape") {
      setOpenDateRange(false)
    }
  }

  const hideOnClickOutSide = (e) => {
    if(refOne.current && !refOne.current.contains(e.target)) {
      setOpenDateRange(false)
    }
  }

  return(
    <div>
        <div ref={refOne}  className={`${styles["dateRangeIcon"]}`}>
            <FontAwesomeIcon icon={faCalendar} className={`${styles["iconCalender"]}`}></FontAwesomeIcon>
            <input onClick={handleOpenDateRange} 
            className ={`${styles['dateRangePickerInput']}`} value={inputValue} type="text" readOnly/> 
        </div>
        {openDateRange && <div><DateRange
                editableDateInputs={true}
                onChange={(item) => setRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={[`rgb(87, 108, 29)`]}
                startDatePlaceholder="Select Start Date"
                endDatePlaceholder="Select End Date"
                className={`${styles['dateRangeCSS']}`}
        /></div>}
    </div>
  )
}

export default DateRangePicker;
