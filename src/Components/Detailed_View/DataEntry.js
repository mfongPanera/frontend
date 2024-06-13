import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InventoryForm from "./InventoryForm";
import DataEntryFiller from "./DataEntryFiller";
function DataEntry() {
  const selectedLocation = useSelector(
    (state) => state.dataReducer.selectedLocation
  );
  const selectedDate = useSelector((state) => state.dataReducer.selectedDate);
  const selectedData = useSelector((state) => state.dataReducer.selectedData);
  const selectedItem = useSelector((state) => state.dataReducer.selectedItem);
  return (
    <>
      {selectedLocation && (selectedDate || selectedItem) && selectedData? (
        <InventoryForm />
      ) : (
        <DataEntryFiller
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
          selectedData = {selectedData}
        />
      )}
    </>
  );
}

export default DataEntry;
