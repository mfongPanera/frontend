import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styles from "./../../Styles/tableview.module.css";
function TableFiller() {
const shop = "Panera"
const selectedLocation = useSelector((state)=>state.dataReducer.selectedLocation);
const selectedDate = useSelector((state)=>state.dataReducer.selectedDate)
  return (
    <Container
      className={`${
        styles[`${shop}_table_view_filler_container`]
      }`}
    >
      <Row
        className={`${styles[`${shop}_table_view_inventory_filler_row`]}`}
      >
        <Row>
          <Col>
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
            <Row className={`${styles[`${shop}_table_view_inventory_filler_row_content`]}`}>
                {!selectedDate && !selectedLocation?"Waiting for you to select date..": !selectedLocation?"Great! Now, please select location!":""}
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}

export default TableFiller