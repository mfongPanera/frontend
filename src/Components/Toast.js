import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToastMessage } from "../app/dataReducer";
import { setInfoMessage } from "../app/uiReducer";
import styles from "./../Styles/common.module.css";
import Toast from "react-bootstrap/Toast";
function ToastMessage() {
  const dispatch = useDispatch();
  const shop = "Panera";
  const toastMessage = useSelector((state) => state.dataReducer.toastMessage);
  const infoMessage = useSelector((state)=>state.uiReducer.infoMessage)
  const closeToast = () => {
    dispatch(updateToastMessage(""));
    dispatch(setInfoMessage(""))
  };
  useEffect(() => {
  }, [toastMessage]);

  useEffect(()=>{
    if(infoMessage)
      dispatch(updateToastMessage(infoMessage))
  },[infoMessage])
  if (toastMessage)
    return (
      <Toast
        className={`${styles[`${shop}_common_toast`]}`}
        bg={toastMessage.type.toLowerCase()}
        delay={3000}
        show={toastMessage}
        onClose={() => {
          closeToast();
        }}
        animation={false}
        autohide
      >
        <Toast.Header
          className={toastMessage.type=="SUCCESS"?`${styles[`${shop}_common_toast_header_success`]}`:`${styles[`${shop}_common_toast_header_failure`]}`}
        >
          <strong className="me-auto">
            {toastMessage.type.charAt(0).toUpperCase() +
              toastMessage.type.slice(1)}
          </strong>
        </Toast.Header>
        <Toast.Body
          className={toastMessage.type=="SUCCESS"?`${styles[`${shop}_common_toast_body_success`]}`:`${styles[`${shop}_common_toast_body_failure`]}`}
        >
          {toastMessage.msg}
        </Toast.Body>
      </Toast>
    );
  else return null;
}

export default ToastMessage;
