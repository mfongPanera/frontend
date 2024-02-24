import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import styles from './../Styles/common.module.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SearchBar from "./SearchBar/SearchBar";
import DateRangePicker from "./DateRangePicker";
import ExportToExcelBtn from "./Table_View/ExportToExcelBtn";
import LocationDropdown from "./Dropdown";
import SearchBarList from "./SearchBar/SearchBarList";
import ImportExcelButton from "./ImportInventory/ImportExcelButton";
function FiltersTab(props) {
const detailedTab = useSelector((state)=>state.uiReducer.detailedTab)
const tableTab = useSelector((state)=>state.uiReducer.tableTab)
const addInventoryTab = useSelector((state) => state.uiReducer.addInventoryTab)
const importInventoryTab = useSelector((state)=>state.uiReducer.importInventoryTab)
const visualizationTab = useSelector((state)=>state.uiReducer.visualizationTab)
const onDownload = props.onDownload;
 const shop = "Panera"
 const [searchResults,setResults] = useState([])
 const [open,setOpen] = useState(false)
 const [inputValue,setInputValue] = useState("")
  return (
    <Row className={`${styles[`${shop}_common_title_row`]}`}>
      <Col xs={3} xl={3} xxl={3} lg={2}>
        <div className={`${styles[`${shop}_common_title`]}`}>
          {detailedTab? "DATA ENTRY":tableTab?"REPORT":addInventoryTab? "ADD NEW INVENTORY / RECEIVING":importInventoryTab ? "IMPORT INVENTORY FILE" : "VISUALIZATION"}
        </div>
      </Col>
      <Col xs={5} xl={5} xxl={5} lg={5}>
        <div className="search-container">
          {!addInventoryTab && !importInventoryTab ? <SearchBar setResults={setResults} setOpen={setOpen} value={inputValue} setInputValue={setInputValue}/>: null }
          {!addInventoryTab && !importInventoryTab ?  <SearchBarList results = {searchResults} open={open} setOpen={setOpen} setInputValue = {setInputValue}/> : null }
        </div>
      </Col>
      <Col className={`${styles[`${shop}_common_date_container`]}`} xs={4} xl={4} xxl={4} lg={5}>
        {!addInventoryTab && !importInventoryTab ? <DateRangePicker /> : null }
        {!addInventoryTab && !importInventoryTab ? <LocationDropdown /> : null }
        {tableTab?<ExportToExcelBtn onDownload={onDownload}/>:null}
        {importInventoryTab ? <ImportExcelButton/> : null}
      </Col>
    </Row>
  );
}

export default FiltersTab;
