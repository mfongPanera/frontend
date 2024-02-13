import React from "react";
import { useSelector, useDispatch } from "react-redux";
import{headers, dataValues}from './../constants'
import Table from "react-bootstrap/Table";

import styles from './../../Styles/tableview.module.css'

const SummaryTable = React.forwardRef((props, ref)=> {
  const shop = "Panera"
  const requestedData = useSelector((state) => state.dataReducer.requestedData);
  const selectedLocation = useSelector(
    (state) => state.dataReducer.selectedLocation
  );
  const selectedDate = useSelector((state) => state.dataReducer.selectedDate);
  return (
    <Table ref = {ref} striped bordered hover responsive>
      <thead className={`${styles[`${shop}_table_view_header`]}`}>
        <tr>
          {headers.map((data, idx) => {
            return <th>{data}</th>;
          })}
        </tr>
      </thead>
      <tbody className={`${styles[`${shop}_table_view_body`]}`}>
        {requestedData && selectedLocation ? (
          requestedData
            .filter((a) => {
              if (selectedLocation != "ALL LOCATIONS") {
                return a.location_ == selectedLocation;
              } else {
                return a;
              }
            })
            .map((data, idx) => {
              return (
                <tr>
                  <td>
                    {selectedDate
                      .toLocaleDateString("en-US")
                      .replaceAll("/", "-")}
                  </td>
                  {dataValues.map((val, id) => {
                    return <td>{data[val]}</td>;
                  })}
                </tr>
              );
            })
        ) : (
          <div>LOCATION NOT SET</div>
        )}
      </tbody>
    </Table>
  );
})

export default SummaryTable;
