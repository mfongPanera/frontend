import React from 'react'
import Sidebar from '../Offcanvas'
import { Container, Row, Col } from 'react-bootstrap'
import FiltersTab from '../FiltersTab'
import styles from '../../Styles/visualizations.module.css'
import ToastMessage from '../Toast'
import { useSelector } from 'react-redux'
import PieChart from './PieChart'

function VisualizationView() {

  const requestedData = useSelector((state)=>state.dataReducer.requestedData)
  const shop = 'Panera'
  const visualizationFiller = () => {
    return(
      <Container fluid className={`${styles[`${shop}_visualization_filler_container`]}`}>
        <Row className={`${styles[`${shop}_visualization_filler_row`]}`}> 
          <Col xs={{span:8, offset:2}}>
            <Row>
              {" "}
              <img
              alt=''
              src={require(`./../images/${shop}.svg`)}
              width={300}
              height={100}
              className={'d-inline-block align-top'}/>
            </Row>
            <Row className={`${styles[`${shop}_visualization_filler_text`]}`}>
              <span>Search for any item or select a date for visualization</span>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }

  const renderVisualization = () => {
    return(
      <Container fluid >
        <Row>
          <Col md={12} xs={12} lg={12} className={`${styles[`${shop}_item_name`]}`}>
            Item Name
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <React.Fragment>
      <ToastMessage />
      <Sidebar />
      <Container fluid>
        <FiltersTab />
        <Row>
          <Col>
            {requestedData==null ? visualizationFiller() : renderVisualization()}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default VisualizationView