import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedLocation,setSelectedData } from "../app/dataReducer";
import styles from "./../Styles/common.module.css";
import React from "react";

function LocationDropdown() {
  const shop = "Panera";
  const requestedLocations = useSelector(
    (state) => state.dataReducer.requestedLocations
  );
  const selectedLocation = useSelector(
    (state) => state.dataReducer.selectedLocation
  );
  const dispatch = useDispatch();
  const handleLocationClick = (loc)=>{
    dispatch(setSelectedLocation(loc));
    dispatch(setSelectedData(""));
  }
  return (
    <Dropdown>
      <Dropdown.Toggle
        placeholder={"SELECT LOCATION"}
        bsPrefix={`${styles[`${shop}_common_dropdown_toggle`]}`}
        childBsPrefix={`${styles[`${shop}_common_dropdown_toggle`]}`}
        id="dropdown-basic"
        className={`${shop}_dropdown`}
      >
        {selectedLocation ? selectedLocation : "SELECT LOCATION"}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className={`${styles[`${shop}_common_dropdown_menu`]}`}
      >
        {requestedLocations
          ? requestedLocations.map((loc, idx) => {
              return (
                <Dropdown.Item
                  onClick={() => handleLocationClick(loc)}
                  className={`${styles[`${shop}_common_dropdown_item`]} ${loc == selectedLocation?styles[`${shop}_common_dropdown_item_active`]:""}`}
                >
                  {loc}
                </Dropdown.Item>
              );
            })
          : "PLEASE SELECT DATE"}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LocationDropdown;
