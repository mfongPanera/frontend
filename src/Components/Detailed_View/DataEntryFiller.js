import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { imageMetaData } from "./../constants";
import styles from "./../../Styles/detailedview.module.css";
function DataEntryFiller(props) {
  const shop = "Panera";
  const {selectedDate,selectedLocation,selectedData} = props;
  return (
    <Container
      className={`${
        styles[`${shop}_detailed_view_inventory_filler_container`]
      }`}
    >
      <Row
        className={`${styles[`${shop}_detailed_view_inventory_filler_row`]}`}
      >
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <Row>
              {" "}
              <img
                alt=""
                src={require(`./../images/${shop}.svg`)}
                width={300}
                height={100}
                className={`d-inline-block align-top`}
              ></img>
            </Row>
            <Row className={`${styles[`${shop}_detailed_view_inventory_filler_row_content`]}`}>
                {!selectedDate && !selectedLocation?"Waiting for you to select date..": !selectedLocation?"Great! Now, please select location!":!selectedData?"Select a card on your left!":null}
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default DataEntryFiller;
