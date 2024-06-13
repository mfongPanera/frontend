import React, { useState } from 'react'
import Sidebar from '../Offcanvas'
import { Container, Row, Col } from 'react-bootstrap'
import FiltersTab from '../FiltersTab'
import styles from '../../Styles/visualizations.module.css'
import ToastMessage from '../Toast'
import { useSelector } from 'react-redux'
import { UserData } from './Data'
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

function VisualizationView() {

  const requestedData = useSelector((state)=>state.dataReducer.requestedData)
  const shop = 'Panera'
  const [barData,setBarData] = useState({
    labels:UserData.map((data)=>data.year),
    datasets:[
      {
        label: "Users gained",
        data:UserData.map((data)=>data.userGain)
      }
    ]
  })
  const [pieData,setPieData] = useState({
    labels:UserData.map((data)=>data.year),
    datasets:[
      {
        label:"Percentage Of Data",
        data:UserData.map((data)=>data.userGain)
      }
    ]
  })
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
      <Container fluid>
        <Row className={`${styles[`${shop}_barchart_row`]}`}>
          <Col lg={5} className={`${styles[`${shop}_barchart`]}`}>
            <h2>Bar Chart 1</h2>
            <Bar data={barData}></Bar>
          </Col>
          <Col lg={2}></Col>
          <Col lg={5} className={`${styles[`${shop}_barchart`]}`}>
            <h2>Bar Chart 1</h2>
            <Bar data={barData}></Bar>
          </Col>
        </Row>
        <Row className={`${styles[`${shop}_barchart_row`]}`}>
          <Col lg={5} className={`${styles[`${shop}_piechart_col`]}`}>
            <div className={`${styles[`${shop}_piechart`]}`}>
              <h2>Pie Chart 1</h2>
              <Pie data={pieData}></Pie>
            </div>
          </Col>
          <Col lg={2}></Col>
          <Col lg={5} className={`${styles[`${shop}_piechart_col`]}`}>
            <div className={`${styles[`${shop}_piechart`]}`}>
              <h2>Pie Chart 2</h2>
              <Pie data={pieData}></Pie>
            </div>
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
            {requestedData==null ? renderVisualization() : visualizationFiller()}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default VisualizationView