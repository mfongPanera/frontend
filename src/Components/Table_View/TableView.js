import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import { useDownloadExcel } from "react-export-table-to-excel";
import FiltersTab from "../FiltersTab";
import SummaryTable from "./SummaryTable";
import TableFiller from "./TableFiller";

import styles from "./../../Styles/tableview.module.css";
import Sidebar from "../Offcanvas";
function TableView() {
  const shop = "Panera";
  const excelTableRef = useRef(null);
  const selectedDate = useSelector((state) => state.dataReducer.selectedDate);
  const selectedLocation = useSelector(
    (state) => state.dataReducer.selectedLocation
  );
  const { onDownload } = useDownloadExcel({
    currentTableRef: excelTableRef.current,
    filename: "Inventory Table",
    sheet: "Inventory Data",
  });

  return (
    <React.Fragment>
      <Sidebar />
      <Container fluid className={styles[`${shop}_detailed_view_container`]}>
        <FiltersTab onDownload={onDownload} />
        {selectedDate && selectedLocation ? (
          <SummaryTable ref={excelTableRef} />
        ) : (
          <TableFiller />
        )}
      </Container>
    </React.Fragment>
  );
}

export default TableView;
