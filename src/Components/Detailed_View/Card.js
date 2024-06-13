import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../app/dataReducer";
import { addDays } from "../../app/helperFunctions";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./../../Styles/detailedview.module.css";
import { format } from "date-fns";

function InventoryCard(props) {
  const shop = "Panera";
  const selectedData = useSelector((state) => state.dataReducer.selectedData);
  var dateToView = null
  const dispatch = useDispatch();
  const handleCardClick = () => {
    dispatch(updateData(props.data));
  };

  const tryRequire = () => {
    console.log(props)
    try {
      return require(`./../images/${props.data.location_}/${props.data.vendor_id}.jpg`);
    } catch (err) {
      return require(`./../images/${props.data.shopid}.svg`);
    }
  };

  if (props.data) {
    dateToView = format(new Date(props.data.created_date),"MM-d-yyyy")
    return (
      <Container
        onClick={handleCardClick}
        className={`${styles[`${shop}_detailed_view_card`]} ${
          selectedData
            ? selectedData.vendor_id == props.data.vendor_id
              ? styles[`${shop}_detailed_view_card_active`]
              : ""
            : ""
        }`}
        fluid
      >
        <Row>
          <Col className={`${styles[`${shop}_detailed_view_card_image`]}`}>
            <Image
              style={{ width: 70, aspectRatio: "1/1" }}
              src={tryRequire()}
              rounded
              sizes="50"
            ></Image>
          </Col>
          <Col
            className={`${
              styles[`${shop}_detailed_view_card_content_container`]
            } ${
              selectedData
                ? selectedData.vendor_id == props.data.vendor_id
                  ? styles[
                      `${shop}_detailed_view_card_content_container_active`
                    ]
                  : ""
                : ""
            }`}
          >
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_header`]
              } ${
                selectedData
                  ? selectedData.vendor_id == props.data.vendor_id
                    ? styles[`${shop}_detailed_view_card_content_header_active`]
                    : ""
                  : ""
              }`}
            >
              <Col
                md={3}
                className={`${styles[`${shop}_detailed_view_card_content`]} ${
                  styles[`${shop}_detailed_view_card_content_body`]
                } ${
                  selectedData
                    ? selectedData.vendor_id == props.data.vendor_id
                      ? styles[`${shop}_detailed_view_card_content_body_active`]
                      : ""
                    : ""
                }`}
              >
                {props.data.created_date == null
                  ? "No Data"
                  : dateToView}
              </Col>
              <Col>
                {props.data.description == null
                  ? "No Data"
                  : props.data.description}
              </Col>
            </Row>
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_body`]
              } ${
                selectedData
                  ? selectedData.vendor_id == props.data.vendor_id
                    ? styles[`${shop}_detailed_view_card_content_body_active`]
                    : ""
                  : ""
              }`}
            >
              <Col>
                Vendor ID -{" "}
                {props.data.vendor_id == null
                  ? "No Data"
                  : props.data.vendor_id}
              </Col>
            </Row>
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_body`]
              } ${
                selectedData
                  ? selectedData.vendor_id == props.data.vendor_id
                    ? styles[`${shop}_detailed_view_card_content_body_active`]
                    : ""
                  : ""
              }`}
            >
              <Col>FoodPro ID - {props.data.foodpro_id == null
                  ? "No Data"
                  : props.data.foodpro_id}</Col>
            </Row>
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_body`]
              } ${
                selectedData
                  ? selectedData.vendor_id == props.data.vendor_id
                    ? styles[`${shop}_detailed_view_card_content_body_active`]
                    : ""
                  : ""
              }`}
            >
              <Col>Sygma ID - {props.data.sygma_id == null
                  ? "No Data"
                  : props.data.sygma_id}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InventoryCard;
