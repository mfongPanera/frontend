import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDatesArray, setUserDetails } from "../../app/dataReducer";
import { changeDetailedTab } from "../../app/uiReducer";
import FiltersTab from "../FiltersTab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "./CardGroup";
import DataEntry from "./DataEntry";
import ToastMessage from "../Toast";
import styles from "./../../Styles/detailedview.module.css";
import Sidebar from "../Offcanvas";
import AddData from "./AddData";
import LoadingSpinner from "./LoadingSpinner";

function DetailedView() {
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.dataReducer.dates);
  const loadingSpinner = useSelector((state) => state.dataReducer.loadingSpinner)
  useEffect(() => {
    fetchDatesOnDetailedViewLoad();
    dispatch(changeDetailedTab());
  }, []);

  const fetchDatesOnDetailedViewLoad = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_distinct_dates");
      const dates = await response.json();
      dispatch(createDatesArray(dates));
    } catch (err) {
      console.error(err.message);
    }
  };

  const shop = "Panera";

  const getName = async ()=>{
    try {
      const res = await fetch("http://localhost:5000/auth/get_name", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);
      dispatch(setUserDetails(parseData));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getName()
  },[])
  return (
    <React.Fragment>
      {loadingSpinner ? <LoadingSpinner/> : <></>}
      <AddData/>
      <Sidebar />
      <Container fluid className={styles[`${shop}_detailed_view_container`]}>
        <ToastMessage />
        <FiltersTab />
        <Row>
          <Col xs={6} md={6} lg={6} xl={5}>
            <CardGroup />
          </Col>
          <Col>
            <DataEntry />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default DetailedView;
