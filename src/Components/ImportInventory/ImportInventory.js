import React, { useState } from "react";
import styles from "./../../Styles/importData.module.css";
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, Table } from "react-bootstrap";
import ToastMessage from "../Toast";
import FiltersTab from "../FiltersTab";
import Sidebar from "../Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "../../app/dataReducer";

function ImportInventory() {
    const shop="Panera";
    const [show,setShow]=useState(false)
    const [message,setModalMessage] = useState(null)
    const parsedData = useSelector((state)=>state.dataReducer.tableData)
    const userName = useSelector((state)=> state.dataReducer.userName)
    const url = "http://localhost:5000/importData"
    const dispatch = useDispatch()
    
    const hideModal = () => {
      setModalMessage(null)
      setShow(false)
      dispatch(
        setTableData(null)
      )
    }
    const handleInsertButtonClick = async ()=> {
      const dataToDB = createRequestBody()

      try {
        const response = await fetch(url,{
          method:'POST',
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify(dataToDB)
        });
        if(response.status.toString() === "200") {
          setModalMessage("Data Inserted Succesfully");
        } else if(response.status.toString() === "501") {
          setModalMessage("Error: Duplicate Food Pro ID Found")
        }else {
          setModalMessage("Error: Data Not Inserted Into DataBase");
        }
      } catch(err) {
        setModalMessage("Error: Data Not Inserted Into Database");
      } finally {
        setShow(true)
      }
    }

    const createRequestBody = () => {
      const dataToDb = parsedData.map((item)=>{
        const data = {}
        data.vendorId= item.Vendor_ID.toString()
        data.foodProId= item.FoodPro_ID.toString()
        data.description= item.Description.toString()
        data.shopName= item.ShopName.toString()
        data.size= item.Size.toString()
        data.measurement= item.Measurement.toString()
        data.packs= item.Pack.toString()
        data.uom= item.UOM.toString()
        data.case=item.Case.toString()
        data.lbs= item.LBS.toString()
        data.bags= item.Bag.toString()
        data.trays=item.Tray.toString() 
        data.ea=item.EA.toString()
        data.oz=item.OZ.toString()
        data.gal=item.GAL.toString()
        data.sleeves=item.Sleeves.toString()
        data.location=item.Location.toString()
        data.unlock=item.Unlock.toString()
        data.userName=userName
        data.category=item.Category.toString()
        data.subCategory=item.Subcategory.toString()
        data.grams=item.Gram.toString()
        data.sygmaId = item.Sygma_ID.toString()
        data.sygmaStatus = item.Sygma_Status.toString()
        data.ibohStatus = item.Iboh_Status.toString()
        return data
      })
      console.log(dataToDb)
      return dataToDb;
    }

    const renderTable=() => {
        return (
          <div className={`${styles[`${shop}_table_div`]}`}>
            <Table striped bordered hover size="md">
              <thead>
                <tr className={`${styles[`${shop}_table_headings`]}`}>
                  {Object.keys(parsedData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row, index) => (
                  <tr key={index} className={`${styles[`${shop}_table_column_values`]}`}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className={`${styles[`${shop}_button_container`]}`}>
              <Button onClick={()=>handleInsertButtonClick()} className={`${styles[`${shop}_insert_button`]}`}>
                INSERT
              </Button>
            </div>
          </div>
        )
    }

    const dataFiller = () => {
        return (
            <Container className={`${styles[`${shop}_detailed_view_inventory_filler_container`]}`}>
                <Row className={`${styles[`${shop}_detailed_view_inventory_filler_row`]}`}>
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
                            <Row className={`${styles[`${shop}_import_invenoty_text`]}`}>
                                <span>Select an input file to import data</span>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
        )
    }

    return(
        <React.Fragment>
            <Sidebar/>
            <Container fluid className={styles[`${shop}_detailed_view_container`]}>
                <ToastMessage />
                <FiltersTab />
                <Row>
                    <Col xs={12} md={12} lg={12} xl={12}>
                        {parsedData==null ? dataFiller():renderTable()}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} centered backdrop="static" keyboard={false} onHide={hideModal}>
              <ModalHeader closeButton>
                <ModalTitle>Status</ModalTitle>
              </ModalHeader>
              <ModalBody>
                {message}
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={hideModal}>Close</Button>
              </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default ImportInventory;