import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import styles from "./../../Styles/detailedview.module.css";
import InventoryCard from "./Card";
import Row from "react-bootstrap/Row";

function CardGroup() {
  const shop = "Panera";
  const requestedData = useSelector((state) => state.dataReducer.requestedData);
  const selectedLocation = useSelector((state)=>state.dataReducer.selectedLocation)
  const instruction = useSelector((state)=>state.dataReducer.instruction);
  useEffect(() => {
    console.log("UPDATING CARDGROUP: ")
  }, [requestedData]);

  return (
    <Container
      className={`${styles[`${shop}_detailed_view_card_group_container`]}`}
      fluid
    >
      {requestedData&&selectedLocation ? (
        requestedData.filter((a)=>{
          if(selectedLocation!="ALL LOCATIONS") {
            return a.location_ == selectedLocation
          }
          else {
            return a;
          }
        }).map((data, idx) => {
          return (
            <Row key={idx}>
              <InventoryCard data={data} />
            </Row>
          );
        })
      ) : (
            <Row className={`${styles[`${shop}_detailed_view_instruction_row`]}`}>
      <Col className={`${styles[`${shop}_detailed_view_instruction_text`]}`}>
        {instruction} 
      </Col>
    </Row>
      )}
    </Container>
  );
}

export default CardGroup;
