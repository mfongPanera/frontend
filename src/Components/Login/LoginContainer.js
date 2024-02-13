import React from "react";
import {useSelector, useDispatch} from 'react-redux';

import Signin from "./Signin";
import Registration from "./Registration";
import ToastMessage from "../Toast";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "./../../Styles/login.module.css";
const AuthForm = () => {
  const auth = useSelector((state)=>state.uiReducer.auth);
  if(auth == 'login') {
    return <Signin/>
  }
  else {
    return <Registration/>
  }
}
function LoginContainer() {
  return (
    <Container className={`${styles["login-container"]}`} fluid={true}>
      <ToastMessage/>
      <Row style={{justifyContent:'center'}}>
        <p className={`${styles["login-title"]}`}>FOODCOURT INVENTORY</p>
      </Row>
      <Row className={`${styles["login-container-row"]}`}>
        <Col>
         <AuthForm/>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginContainer;
