import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToastMessage } from "../app/dataReducer";
import Alert from "react-bootstrap/Alert";
function InventoryAlert() {
  const toastMessage = useSelector((state) => state.dataReducer.toastMessage);
  if (toastMessage)
    return <Alert variant={toastMessage.type}>{toastMessage.msg}</Alert>;
  else return null;
}

export default InventoryAlert;
