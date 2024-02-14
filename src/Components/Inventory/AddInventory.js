import React, { useEffect } from "react";
import { useState } from "react";
import { Form, FormControl, FormGroup, FormLabel, Container, FormSelect, Button, Col,Row,Modal
    , ModalHeader, ModalTitle, ModalBody, ModalFooter, Tooltip, OverlayTrigger } from "react-bootstrap";
import Sidebar from "../Offcanvas";
import FiltersTab from "../FiltersTab";
import styles from "./../../Styles/addInventory.module.css";
import Feedback from "react-bootstrap/esm/Feedback";
import { useSelector } from "react-redux";
import ToastMessage from "../Toast";

function AddInventory() {
    
    const [inventoryId,setInventoryID] = useState(null)
    const [feedback,setFeedback] = useState(false)
    const [foodProId,setFoodProID] = useState(null)
    const [description,setDescription] = useState(null)
    const [location,setLocation] = useState(null)
    const [shopName,setShopName] = useState(null)
    const [size,setSize] = useState(null)
    const [measurement,setMeasurement] = useState(null)
    const [pack,setPacks] = useState(null)
    const [uom,setUOM] = useState(null)
    const [Case,setCase] = useState(null)
    const [lbs,setLBS] = useState(null)
    const [bag,setBags] = useState(null)
    const [tray,setTrays] = useState(null)
    const [ea,setEA] = useState(null)
    const [oz,setOZ] = useState(null)
    const [gal,setGAL] = useState(null)
    const [sleeves,setSleeves] = useState(null)
    const [validate,setValidation] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [modalMessage,setModalMessage] = useState(null)
    const [unlock,setUnlock] = useState(null)
    const [oztolbs,setOzToLBS] = useState(null)
    const [mltooz,setMlToOz] = useState(null)
    const [lttooz, setLTtoOZ] = useState(null)
    const [mltol, setMlToL] = useState(null)
    const userName = useSelector((state)=> state.dataReducer.userName)
    const url = "http://localhost:5000/addItem"

    const handleSubmit = async (e) => {
        console.log("userName: "+userName)
        setValidation(false);
        e.preventDefault();
        checkAllFields();
        setFeedback(true)
        console.log("validate: "+validate)
        if(validate) {
            insertDataIntoDB()
        }
    }

    useEffect(()=>{
        if(checkIsEmpty(inventoryId) || checkIsEmpty(foodProId) || checkIsEmpty(description) ||
           checkIsEmpty(shopName) || checkIsNegative(size) || checkIsEmpty(measurement) || 
           checkIsEmpty(location) || checkIsEmpty(uom) || checkIsNegative(pack) ||
           checkIsNegative(Case) || checkIsNegative(lbs) || checkIsNegative(bag) || 
           checkIsNegative(ea) || checkIsNegative(oz) || checkIsNegative(tray) || 
           checkIsNegative(sleeves) || checkIsNegative(gal) || checkIsEmpty(unlock) 
           || checkIsNegative(oztolbs) || checkIsNegative(mltooz) || checkIsNegative(lttooz)
           || checkIsNegative(mltol)) {
            setValidation(false)
        }  else {
            setValidation(true)
        }
    },[inventoryId,foodProId,description,shopName,size,measurement,location
        ,uom,pack,Case,lbs,bag,ea,oz,tray,sleeves,gal,unlock,oztolbs,mltooz,lttooz,mltol])

    const insertDataIntoDB = async () => {
        const data = {
            vendorId: inventoryId,
            foodProId: foodProId,
            description: description,
            shopName: shopName,
            size: size,
            measurement: measurement,
            packs: pack,
            uom: uom,
            case:Case,
            lbs: lbs,
            bags: bag,
            trays:tray, 
            ea:ea,
            oz:oz,
            gal:gal,
            sleeves:sleeves,
            location:location,
            unlock:unlock,
            userName:userName,
            ozToLBS:oztolbs,
            mltooz:mltooz,
            lttooz:lttooz,
            mltol:mltol
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            });
            if(response.status.toString() === "404") {
                setModalMessage("Error Occurred While Adding Data into DB error: 404 not  Found")
            } else if(response.status.toString() === "500") {
                setModalMessage("Error Occurred While Adding Data into DB error: "+response.body.message)
            }else if(response.status.toString() === "200") {
                setModalMessage(`Item ${description} successfully inserted into database with Vendor ID 
                ${inventoryId} and FoodPro ID ${foodProId}`)
            }
        } catch (err) {
            setModalMessage("Error Occurred while inserting data into Database")
        } finally {
            setShowModal(true)
        }
    }

    const checkIsEmpty = (str) => {
        if(str == null) {
            return true
        }
        else if(str=== "" || str.trim() === "") {
            return true;
        } else {
            return false;
        }
    }

    const checkIsNegative = (val) => {
        if(val==null){
            return true
        }
        val = parseInt(val)
        if(val<0){
            return true;
        }
        return false
    }

    const removeClasses = () => {
        document.getElementById("inventoryID").classList.remove("is-invalid")  
        document.getElementById("inventoryID").classList.remove("is-valid")
        document.getElementById("foodProID").classList.remove("is-invalid")  
        document.getElementById("foodProID").classList.remove("is-valid")
        document.getElementById("description").classList.remove("is-invalid")  
        document.getElementById("description").classList.remove("is-valid")
        document.getElementById("location").classList.remove("is-invalid")  
        document.getElementById("location").classList.remove("is-valid")
        document.getElementById("shopName").classList.remove("is-invalid")  
        document.getElementById("shopName").classList.remove("is-valid")
        document.getElementById("size").classList.remove("is-invalid")  
        document.getElementById("size").classList.remove("is-valid")
        document.getElementById("measurement").classList.remove("is-invalid")  
        document.getElementById("measurement").classList.remove("is-valid")
        document.getElementById("pack").classList.remove("is-invalid")  
        document.getElementById("pack").classList.remove("is-valid")
        document.getElementById("uom").classList.remove("is-invalid")  
        document.getElementById("uom").classList.remove("is-valid")
        document.getElementById("case").classList.remove("is-invalid")  
        document.getElementById("case").classList.remove("is-valid")
        document.getElementById("lbs").classList.remove("is-invalid")  
        document.getElementById("lbs").classList.remove("is-valid")
        document.getElementById("bag").classList.remove("is-invalid")  
        document.getElementById("bag").classList.remove("is-valid")
        document.getElementById("tray").classList.remove("is-invalid")  
        document.getElementById("tray").classList.remove("is-valid")
        document.getElementById("ea").classList.remove("is-invalid")  
        document.getElementById("ea").classList.remove("is-valid")
        document.getElementById("oz").classList.remove("is-invalid")  
        document.getElementById("oz").classList.remove("is-valid")
        document.getElementById("gal").classList.remove("is-invalid")  
        document.getElementById("gal").classList.remove("is-valid")
        document.getElementById("sleeves").classList.remove("is-invalid")  
        document.getElementById("sleeves").classList.remove("is-valid")
        document.getElementById("unlock").classList.remove("is-invalid")  
        document.getElementById("unlock").classList.remove("is-valid")
        document.getElementById("ozToLBS").classList.remove("is-valid")
        document.getElementById("ozToLBS").classList.remove("is-invalid")
        document.getElementById("mltooz").classList.remove("is-valid")
        document.getElementById("mltooz").classList.remove("is-invalid")
        document.getElementById("lttooz").classList.remove("is-valid")
        document.getElementById("lttooz").classList.remove("is-invalid")
        document.getElementById("mltoltr").classList.remove("is-valid")
        document.getElementById("mltoltr").classList.remove("is-invalid")
    }

    const checkAllFields = () => {
        //InventoryID
        if(checkIsEmpty(inventoryId)) {
            document.getElementById("inventoryID").classList.add("is-invalid")  
            document.getElementById("inventoryID").classList.remove("is-valid")   
        } else {
            document.getElementById("inventoryID").classList.add("is-valid")
            document.getElementById("inventoryID").classList.remove("is-invalid")
        }
        if(checkIsEmpty(foodProId)) {
            document.getElementById("foodProID").classList.add("is-invalid")  
            document.getElementById("foodProID").classList.remove("is-valid")
        } else {
            document.getElementById("foodProID").classList.remove("is-invalid")  
            document.getElementById("foodProID").classList.add("is-valid")
        }
        if(checkIsEmpty(description)) {
            document.getElementById("description").classList.add("is-invalid")  
            document.getElementById("description").classList.remove("is-valid")
        } else {
            document.getElementById("description").classList.remove("is-invalid")  
            document.getElementById("description").classList.add("is-valid")
        }
        if(checkIsEmpty(location)) {
            document.getElementById("location").classList.add("is-invalid")  
            document.getElementById("location").classList.remove("is-valid")
        } else {
            document.getElementById("location").classList.remove("is-invalid")  
            document.getElementById("location").classList.add("is-valid")
        }
        if(checkIsEmpty(shopName)) {
            document.getElementById("shopName").classList.add("is-invalid")  
            document.getElementById("shopName").classList.remove("is-valid")
        } else {
            document.getElementById("shopName").classList.remove("is-invalid")  
            document.getElementById("shopName").classList.add("is-valid")
        }
        if(checkIsNegative(size)) {
            document.getElementById("size").classList.add("is-invalid")  
            document.getElementById("size").classList.remove("is-valid")
        } else {
            document.getElementById("size").classList.remove("is-invalid")  
            document.getElementById("size").classList.add("is-valid")
        }
        if(checkIsEmpty(measurement)) {
            document.getElementById("measurement").classList.add("is-invalid")  
            document.getElementById("measurement").classList.remove("is-valid")
        } else {
            document.getElementById("measurement").classList.remove("is-invalid")  
            document.getElementById("measurement").classList.add("is-valid")
            
        }
        if(checkIsNegative(pack)) {
            document.getElementById("pack").classList.add("is-invalid")  
            document.getElementById("pack").classList.remove("is-valid")
            
        } else {
            document.getElementById("pack").classList.remove("is-invalid")  
            document.getElementById("pack").classList.add("is-valid")
            
        }
        if(checkIsEmpty(uom)) {
            document.getElementById("uom").classList.add("is-invalid")  
            document.getElementById("uom").classList.remove("is-valid")
            
        } else {
            document.getElementById("uom").classList.remove("is-invalid")  
            document.getElementById("uom").classList.add("is-valid")
        
        }
        if(checkIsNegative(Case)) {
            document.getElementById("case").classList.add("is-invalid")  
            document.getElementById("case").classList.remove("is-valid")
            
        } else {
            document.getElementById("case").classList.remove("is-invalid")  
            document.getElementById("case").classList.add("is-valid")
            
        }
        if(checkIsNegative(lbs)) {
            document.getElementById("lbs").classList.add("is-invalid")  
            document.getElementById("lbs").classList.remove("is-valid")
            
        } else {
            document.getElementById("lbs").classList.remove("is-invalid")  
            document.getElementById("lbs").classList.add("is-valid")
            
        }
        if(checkIsNegative(bag)) {
            document.getElementById("bag").classList.add("is-invalid")  
            document.getElementById("bag").classList.remove("is-valid")
            
        } else {
            document.getElementById("bag").classList.remove("is-invalid")  
            document.getElementById("bag").classList.add("is-valid")
            
        }
        if(checkIsNegative(tray)) {
            document.getElementById("tray").classList.add("is-invalid")  
            document.getElementById("tray").classList.remove("is-valid")
            
        } else {
            
            document.getElementById("tray").classList.remove("is-invalid")  
            document.getElementById("tray").classList.add("is-valid")
        }
        if(checkIsNegative(ea)) {
            document.getElementById("ea").classList.add("is-invalid")  
            document.getElementById("ea").classList.remove("is-valid")
        
        } else {
            document.getElementById("ea").classList.remove("is-invalid")  
            document.getElementById("ea").classList.add("is-valid")
        }
        if(checkIsNegative(oz)) {
            document.getElementById("oz").classList.add("is-invalid")  
            document.getElementById("oz").classList.remove("is-valid")
           
        } else {
            document.getElementById("oz").classList.remove("is-invalid")  
            document.getElementById("oz").classList.add("is-valid")
        }
        if(checkIsNegative(gal)) {
            document.getElementById("gal").classList.add("is-invalid")  
            document.getElementById("gal").classList.remove("is-valid")
            
        } else {

            document.getElementById("gal").classList.remove("is-invalid")  
            document.getElementById("gal").classList.add("is-valid")
        }
        if(checkIsNegative(sleeves)) {
            document.getElementById("sleeves").classList.add("is-invalid")  
            document.getElementById("sleeves").classList.remove("is-valid")
            
        } else {
            document.getElementById("sleeves").classList.remove("is-invalid")  
            document.getElementById("sleeves").classList.add("is-valid")
        }
        if(checkIsEmpty(unlock)) {
            document.getElementById("unlock").classList.add("is-invalid")  
            document.getElementById("unlock").classList.remove("is-valid")
        } else {
            document.getElementById("unlock").classList.remove("is-invalid")  
            document.getElementById("unlock").classList.add("is-valid")
        } 
        if(checkIsNegative(oztolbs)) {
            document.getElementById("ozToLBS").classList.add("is-invalid")
            document.getElementById("ozToLBS").classList.remove("is-valid")
        } else {
            document.getElementById("ozToLBS").classList.add("is-valid")
            document.getElementById("ozToLBS").classList.remove("is-invalid")
        }
        if(checkIsNegative(mltooz)) {
            document.getElementById("mltooz").classList.add("is-invalid")
            document.getElementById("mltooz").classList.remove("is-valid")
        } else {
            document.getElementById("mltooz").classList.add("is-valid")
            document.getElementById("mltooz").classList.remove("is-invalid")
        }
        if(checkIsNegative(lttooz)) {
            document.getElementById("lttooz").classList.add("is-invalid")
            document.getElementById("lttooz").classList.remove("is-valid")
        } else {
            document.getElementById("lttooz").classList.add("is-valid")
            document.getElementById("lttooz").classList.remove("is-invalid")
        }
        if(checkIsNegative(mltol)) {
            document.getElementById("mltoltr").classList.remove("is-valid")
            document.getElementById("mltoltr").classList.add("is-invalid")
        } else {
            document.getElementById("mltoltr").classList.add("is-valid")
            document.getElementById("mltoltr").classList.remove("is-invalid")
        }
    }

    const handleReset = () => {
       setInventoryID(null)
       setFeedback(false)
       setFoodProID(null)
       setDescription(null)
       setSize(null)
       setMeasurement(null)
       setPacks(null)
       setUOM(null)
       setCase(null)
       setLBS(null)
       setBags(null)
       setTrays(null)
       setEA(null)
       setOZ(null)
       setGAL(null)
       setSleeves(null)
       setLocation(null)
       setShopName(null)
       setValidation(false)
       setModalMessage(null)
       setUnlock(null)
       setOzToLBS(null)
       setMlToOz(null)
       setLTtoOZ(null)
       setMlToL(null)
       removeClasses()
    }

    const handleInventoryID = (e) => {
        setInventoryID(e.target.value)
    }

    const handleShopName = (e) => {
        setShopName(e.target.value)
    }

    const handleFoodProID = (e) => {
        setFoodProID(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSize = (e) => {
        setSize(e.target.value)
    }
    
    const handleMeasurement = (e) => {
        setMeasurement(e.target.value)
    }

    const handlePack = (e) => {
        setPacks(e.target.value)
    }

    const handleUOM = (e) => {
        setUOM(e.target.value)
    }

    const handleCase = (e) => {
        setCase(e.target.value)
    }

    const handleLBS = (e) => {
        setLBS(e.target.value)
    }

    const handleBags = (e) => {
        setBags(e.target.value)
    }

    const handleTray = (e) => {
        setTrays(e.target.value)
    }

    const handleEA = (e) => {
        setEA(e.target.value)
    }

    const handleOZ = (e) => {
        setOZ(e.target.value)
    }

    const handleGal = (e) => {
        setGAL(e.target.value)
    }

    const handleSleeves = (e) => {
        setSleeves(e.target.value)
    }

    const handleLocation = (e) => {
        setLocation(e.target.value)
    }

    const handleUnlock = (e) => {
        setUnlock(e.target.value)
    }

    const handleOzToLBS = (e) => {
        setOzToLBS(e.target.value)
    }

    const handleMlToOz = (e) => {
        setMlToOz(e.target.value)
    }

    const handleLTtoOZ = (e) => {
        setLTtoOZ(e.target.value)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const handleMltoL = (e) => {
        setMlToL(e.target.value)
    }

    const inventoryToolTip = (
        <Tooltip id="inventory">
            Enter Vendor ID (Ex: BAK0001)
        </Tooltip>
    )

    const foodProToolTip = (
        <Tooltip id="foodPro">
            Enter Food Pro Id (Ex: 23123D)
        </Tooltip>
    )

    const submitToolTip = (
        <Tooltip id="submit">
            Click to Submit Form
        </Tooltip>
    )

    const resetToolTip = (
        <Tooltip id="reset">
            Click to reset form
        </Tooltip>
    )

    const locationToolTip = (
        <Tooltip id="location">
            Select Location
        </Tooltip>
    )

    const descriptionToolTip = (
        <Tooltip id="description">
            Enter Description (Ex: Burger)
        </Tooltip>
    )

    const shopNameToolTip = (
        <Tooltip id="shopName">
            Select Shop Name
        </Tooltip>
    )

    const sizeToolTip = (
        <Tooltip id="size">
            Enter Size (Min: 0)
        </Tooltip>
    )

    const measurementToolTip = (
        <Tooltip id="measurement">
            Enter Measurement (Ex: FT)
        </Tooltip>
    )

    const packToolTip = (
        <Tooltip id="pack">
            Enter Pack (Min: 0)
        </Tooltip>
    )

    const uomToolTip = (
        <Tooltip id="UOM">
            Enter UOM (Ex: CS)
        </Tooltip>
    )

    const caseToolTip = (
        <Tooltip id="case">
            Enter Case (Min: 0)
        </Tooltip>
    )

    const lbsToolTip = (
        <Tooltip id="lbs">
            Enter LBS (Min: 0)
        </Tooltip>
    )

    const bagToolTip = (
        <Tooltip id="bag">
            Enter Number Of Bags (Min: 0)
        </Tooltip>
    )

    const trayToolTip = (
        <Tooltip id="trays">
            Enter Number Of Trays (Min: 0)
        </Tooltip>
    )

    const eaToolTip = (
        <Tooltip id="ea">
            Enter EA (Min: 0)
        </Tooltip>
    )

    const ozToolTip = (
        <Tooltip id="OZ">
            Enter OZ (Min: 0)
        </Tooltip>
    )

    const galToolTip = (
        <Tooltip id="gal">
            Enter GAL (Min: 0)
        </Tooltip>
    )

    const sleevesToolTip = (
        <Tooltip id="sleeves">
            Enter sleeves (Min: 0)
        </Tooltip>
    )

    const unlockToolTip = (
        <Tooltip id="unlock">
            Enter Unlock Value (Ex: EA-CASE)
        </Tooltip>
    )

    const ozToLbsTooltip = (
        <Tooltip id="ozToLBS">
            Enter Oz to LBS value
        </Tooltip>
    )
    
    const mlToOzToolTip = (
        <Tooltip id="mltoOz">
            Enter ML to OZ Value
        </Tooltip>
    )
    const lttooztooltip = (
        <Tooltip id="lttOz">
            Enter LT To OZ value
        </Tooltip>
    )
    const mlToLtrToolTip = (
        <Tooltip id="mltoltr">
            Enter ML To LTR value
        </Tooltip>
    )
    return(
        <React.Fragment>
            <Sidebar/>
            <Container fluid >
                <ToastMessage/>
                <FiltersTab/>
                <Form className={styles[`formContainer`]} onSubmit={(e) => handleSubmit(e)} onReset={()=> handleReset()} noValidate>
                    <Row>
                        <Col xs={12} md={12} sm={12} lg={12} xl={12} xxl={12} className={styles[`itemDetails`]}>
                            ITEM DETAILS
                        </Col>
                    </Row>
                    <Row className={styles[`field_rows`]}>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6} >
                                    <FormLabel className={styles[`input_label`]}>Vendor Id</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={inventoryToolTip}>
                                            <FormControl required type="input" placeholder="Enter Inventory Id..." className={styles[`input_row_value`]}
                                            onChange={(e) => handleInventoryID(e)} id="inventoryID"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>} 
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col  xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>FoodPro ID</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={foodProToolTip}>
                                            <FormControl className={styles[`input_row_value`]} required type="input" placeholder="Enter FoodPro Id..." 
                                            onChange={(e)=>handleFoodProID(e)} id="foodProID" ></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>} 
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Location</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={locationToolTip}>
                                            <FormSelect className={styles[`input_row_value`]} required onChange={(e) => handleLocation(e)} id="location">
                                                <option value="">Select Any Option</option>
                                                <option value="Bakers Area">Bakers Area</option>
                                                <option value="Not Using">Not Using</option>
                                                <option value="Barista">Barista</option>
                                                <option value="Dining">Dining</option>
                                                <option value="Dry Storage">Dry Storage</option>
                                                <option value="EE Chem/Clean">EE Chem/Clean</option>
                                                <option value="Freezer">Freezer</option>
                                                <option value="Line">Line</option>
                                                <option value="Misc">Misc</option>
                                                <option value="Catering">Catering</option>
                                                <option value="Main Walk-In">Main Walk-In</option>
                                                <option value="Walk-in">Walk-in</option>
                                                <option value="New Items">New Items</option>
                                                <option value="Office">Office</option>
                                                <option value="Register">Register</option>
                                                <option value="Soda">Soda</option>
                                                <option value="Line: Dry Misc">Line: Dry Misc</option>
                                                <option value="Walk-in: Baker's Area">Walk-in: Baker's Area</option>
                                                <option value="Bakers Area: Food">Baker's Area: Food</option>
                                                <option value="Bakers Area: Non-Food">Baker's Area: Non-Food</option>
                                                <option value="Bakers Walk-In:">Baker's Walk-In:</option>
                                                <option value="Chemicals: Ecolab">Chemicals: Ecolab</option>
                                                <option value="N/A">N/A</option>
                                                <option value="Office">Office</option>
                                                <option value="Prep">Prep</option>
                                                <option value="ALL LOCATIONS">All Locations</option>
                                            </FormSelect>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Select Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles[`field_rows`]}>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Description</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={descriptionToolTip}>
                                            <FormControl required type="input" placeholder="Enter Description" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleDescription(e)} id="description"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Shop Name</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={shopNameToolTip}>
                                        <FormSelect className={styles[`input_row_value`]} required onChange={(e) => handleShopName(e)}
                                            id="shopName">
                                                <option value="">Select Any Option</option>
                                                <option value="PANERA BREAD">Panera Bread</option>
                                            </FormSelect>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Select Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Size</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={sizeToolTip}>
                                            <FormControl required type="number" placeholder="Enter Size.." className={styles[`input_row_value`]} 
                                            onChange={(e) => handleSize(e)} id="size"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles[`field_rows`]}>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Measurement</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={measurementToolTip}>
                                            <FormControl required type="input" placeholder="Enter Measurement" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleMeasurement(e)} id="measurement"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Pack</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={packToolTip}>
                                            <FormControl required type="number" placeholder="Enter Number Of Packs.." className={styles[`input_row_value`]} 
                                            onChange={(e)=>handlePack(e)} id="pack"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>UOM</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={uomToolTip}>
                                            <FormControl required type="input" placeholder="Enter UOM" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleUOM(e)} id="uom"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles[`onHandInventory`]}>
                            ON-HAND INVENTORY
                        </Col>
                    </Row>
                    <Row className={styles[`field_rows`]}>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Case</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={caseToolTip}>
                                            <FormControl required type="number" placeholder="Enter Number of case" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleCase(e)} id="case"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}> 
                                    <FormLabel className={styles[`input_label`]}>LBS</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={lbsToolTip}>
                                            <FormControl required type="number" placeholder="Enter LBS" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleLBS(e)} id="lbs"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Bag</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={bagToolTip}>
                                            <FormControl required type="number" placeholder="Enter Number of Bags" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleBags(e)} id="bag"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles[`field_rows`]}>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Tray</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={trayToolTip}>
                                            <FormControl required type="number" placeholder="Enter Number of trays" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleTray(e)} id="tray"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>EA</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={eaToolTip}>
                                            <FormControl required type="number" placeholder="Enter EA" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleEA(e)} id="ea"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>OZ</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}> 
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={ozToolTip}>
                                            <FormControl required type="number" placeholder="Enter OZ" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleOZ(e)} id="oz"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles[`field_rows`]}>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Gal</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={galToolTip}>
                                            <FormControl required type="number" placeholder="Enter GAL" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleGal(e)} id="gal"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles[`input_label`]}>Sleeves</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={sleevesToolTip}>
                                            <FormControl required type="number" placeholder="Enter Sleeves" className={styles[`input_row_value`]} 
                                            onChange={(e)=>handleSleeves(e)} id="sleeves"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={12} sm={6} >
                                    <FormLabel className={styles[`input_label`]}>Unlock</FormLabel>
                                </Col>
                                <Col xs={12} sm={6} >
                                    <FormGroup className={styles[`input_row`]}>
                                        <OverlayTrigger placement="bottom" overlay={unlockToolTip}>
                                            <FormControl required type="input" placeholder="Enter Unlock" className={styles[`input_row_value`]}
                                            onChange={(e)=>handleUnlock(e)} id="unlock"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles[`input_tooltip_good`]}>Looks Good!</Feedback> : <></> }
                                        {feedback ? <Feedback tooltip type="invalid" className={styles[`input_tooltip`]}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles['field_rows']}>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles['form_row']}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles['input_label']}>oz to lbs</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles['input_row']}>
                                        <OverlayTrigger placement="bottom" overlay={ozToLbsTooltip}>
                                            <FormControl required type="number" placeholder="Enter oz to lbs value" className={styles['input_row_value']}
                                            onChange={(e) => handleOzToLBS(e)} id="ozToLBS"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles['input_tooltip_good']}>Looks Good!</Feedback>: <></>}
                                        {feedback ? <Feedback tooltip type="invalid" className={styles['input_tooltip']}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles['form_row']}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles['input_label']}>ml to oz</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles['input_row']}>
                                        <OverlayTrigger placement="bottom" overlay={mlToOzToolTip}>
                                            <FormControl required type="number" placeholder="Enter ML to OZ value" className={styles['input_row_value']}
                                            onChange={(e) => handleMlToOz(e)} id="mltooz"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback  tooltip type="valid" className={styles['input_tooltip_good']}>Looks Good!</Feedback> : <></>}
                                        {feedback ? <Feedback  tooltip type="invalid" className={styles['input_tooltip_good']}>Enter Value</Feedback> : <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles['form_row']}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles['input_label']}>ltr to oz</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles['input_row']}>
                                        <OverlayTrigger placement="bottom" overlay={lttooztooltip}>
                                            <FormControl required type="number" placeholder="Enter LT to OZ value" className={styles['input_row_value']}
                                            onChange={(e) => handleLTtoOZ(e)} id="lttooz"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback  tooltip type="valid" className={styles['input_tooltip_good']}>Looks Good!</Feedback> : <></>}
                                        {feedback ? <Feedback  tooltip type="invalid" className={styles['input_tooltip_good']}>Enter Value</Feedback> : <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles['field_rows']}>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles['form_row']}>
                                <Col xs={12} sm={6}>
                                    <FormLabel className={styles['input_label']}>ml to ltr</FormLabel>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormGroup className={styles['input_row']}>
                                        <OverlayTrigger placement="bottom" overlay={mlToLtrToolTip}>
                                            <FormControl required type="number" placeholder="Enter ml to l value" className={styles['input_row_value']}
                                            onChange={(e) => handleMltoL(e)} id="mltoltr"></FormControl>
                                        </OverlayTrigger>
                                        {feedback ? <Feedback tooltip type="valid" className={styles['input_tooltip_good']}>Looks Good!</Feedback>: <></>}
                                        {feedback ? <Feedback tooltip type="invalid" className={styles['input_tooltip']}>Enter Value</Feedback>: <></>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles[`submitResetButtons`]}>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                            <Row className={styles[`form_row`]}>
                                <Col xs={6} sm={6}>
                                    <OverlayTrigger placement="top" overlay={submitToolTip}>
                                        <Button type="submit">Submit</Button>
                                    </OverlayTrigger>
                                </Col>
                                <Col xs={6} sm={6}>
                                    <OverlayTrigger placement="top" overlay={resetToolTip}>
                                        <Button type="reset" className={styles[`resetButton`]}>Reset</Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Modal show={showModal} onHide={hideModal} centered backdrop="static" keyboard={false}>
                <ModalHeader closeButton>
                    <ModalTitle>Status</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={hideModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default AddInventory;