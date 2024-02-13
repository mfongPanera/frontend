import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./../../Styles/common.module.css";
import { RiFileExcel2Line } from "react-icons/ri";
function ExportToExcelBtn(props) {
  const onDownload = props.onDownload;
  const shop = "Panera";
  return (
    <Button
      onClick={onDownload}
      className={`${styles[`${shop}_common_excel_download_btn`]}`}
    >
      <RiFileExcel2Line
        size={"1.4em"}
        className={`${styles[`${shop}_common_excel_icon`]}`}
      />
      Download Excel
    </Button>
  );
}

export default ExportToExcelBtn;
