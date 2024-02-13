import React, { useState } from "react";
import { useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./../../Styles/common.module.css";
import { RiFileExcel2Line } from "react-icons/ri";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import {
    setTableData
} from '../../app/dataReducer'

function ImportExcelButton() {
    const shop = 'Panera';
    const inputFile = useRef(null);
    const dispatch = useDispatch()

    const handleButtonClick = () => {
        inputFile.current.click();
    }

    const handleImportExcel = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            dispatch(setTableData(parsedData))
        };
        e.target.value=null
    }

    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col xl={12}>
                        <Button className={`${styles[`${shop}_common_import_label`]}`} onClick={handleButtonClick}>
                            <RiFileExcel2Line  size={"1.4em"}
                                className={`${styles[`${shop}_common_excel_icon`]}`}>
                            </RiFileExcel2Line>
                            Select File For Importing Data
                        </Button>
                    </Col>
                    <Col>
                        <input type="file" id="file" ref={inputFile} onChange={(e)=>handleImportExcel(e)} 
                            accept=".csv,.xlsx"
                            className={`${styles[`${shop}_common_excel_import_btn`]}`}></input>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ImportExcelButton;