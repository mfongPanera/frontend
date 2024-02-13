import React, { useState, useEffect } from "react";

import { BsPlusCircle } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./../../Styles/detailedview.module.css";
import "./../../Styles/datepicker.css";

function AddData() {
  const shop = "Panera";
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(false);
  const [status, setStatus] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addDataForYear = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/add_all_inventory/${date
          .toLocaleDateString("en-US")
          .replaceAll("/", "-")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };
  const getYear = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get_year/${date
          .toLocaleDateString("en-US")
          .replaceAll("/", "-")}`
      );
      const data = await response.json();
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const loopThroughYear = async () => {
    const startDate = new Date(year.valueOf());
    let yearExists = await getYear(startDate);
    if (yearExists) {
      console.log("data exists");
      setStatus("Data for this year already exists");
    } else {
      const endDate = new Date(year.valueOf());
      endDate.setFullYear(endDate.getFullYear() + 1);
      for (let day = startDate; day < endDate; day.setDate(day.getDate() + 1)) {
        const response = await addDataForYear(day);
        console.log("DAY: ", day);
        if (response) {
          setStatus("Raw Data for " + day.toLocaleDateString() + " updated!");
        } else {
          setStatus("Raw Data for " + day.toLocaleDateString() + " failed!");
        }
      }
    }
    setTimeout(() => {
      handleClose();
      setStatus(false);
    }, 3000);
    // handleClose();
  };
  return (
    <>
      <Button
        className={`${styles[`${shop}_detailed_view_add_button`]}`}
        onClick={handleShow}
      >
        <BsPlusCircle
          className={`${styles[`${shop}_detailed_view_add_button_icon`]}`}
          size={"20px"}
        />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Empty Data for the year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Please select an year and click on Add Data</div>
          {status ? <div>{status}</div> : null}
        </Modal.Body>
        <Modal.Footer>
          <DatePicker
            dayClassName={(date) => {
              return `${shop}_datepicker_day`;
            }}
            calendarClassName={`${shop}_datepicker`}
            className={`${shop}_datepicker_input`}
            onChange={(date) => setYear(date)}
            selected={year}
            dateFormat={"MM-dd-yyyy"}
            placeholderText="SELECT YEAR"
            showYearPicker
            showIcon
          />
          <Button variant="primary" onClick={loopThroughYear}>
            Add Data
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddData;
