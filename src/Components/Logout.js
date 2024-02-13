import React from 'react'
import {useDispatch} from 'react-redux'
import { resetDataState,setIsAuthenticated } from '../app/dataReducer'
import { resetUiState } from '../app/uiReducer'
import styles from './../Styles/offcanvas.module.css'
function Logout() {
    const shop = 'Panera'
    const dispatch = useDispatch();

    const handleLogout = async () => {
      try {
        localStorage.removeItem("token");
        dispatch(resetDataState());
        dispatch(resetUiState());
        dispatch(setIsAuthenticated(false));
  
        console.log("Logout successfully");
      } catch (err) {
        console.error(err.message);
      }
    };
  
  return (
    <div onClick = {()=>handleLogout()} className={`${styles[`${shop}_logout_button`]}`}>Logout</div>
  )
}

export default Logout