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
import { excelTemp } from "./ExcelTemp";
import FileSaver from "file-saver";

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

    const handleDownloadExcel = (e) => {
        let dataToBlob = excelTemp;
        let sliceSize = 1024;
        let byteCharacters = atob(dataToBlob);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength/sliceSize);
        let byteArrays = new Array(slicesCount)
        for (let sliceIndex=0;sliceIndex<slicesCount;++sliceIndex) {
            let begin = sliceIndex * sliceSize;
            let end= Math.min(begin+sliceSize,bytesLength)
            let bytes= new Array(end-begin);
            for(var offset=begin,i=0;offset<end;++i,++offset) {
                bytes[i]=byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex]=new Uint8Array(bytes);
        }
        let blob = new Blob(byteArrays,{type:"application/vnd.ms-excel"});
        FileSaver.saveAs(new Blob([blob],{}),"sampleTemplate.csv");
    }

    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col xl={5}>
                        <Button onClick={(e)=>handleDownloadExcel(e)} className={`${styles[`${shop}_common_import_label`]}`}>
                            <RiFileExcel2Line size={"1.4em"}
                                className={`${styles[`${shop}_common_excel_icon`]}`}>
                            </RiFileExcel2Line>
                            Download CSV Template
                        </Button>
                    </Col>
                    <Col xl={6}>
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