import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'

import { toggleAuth, setInfoMessage} from "../../app/uiReducer";
import {setIsAuthenticated,setUserName } from "../../app/dataReducer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import jwt_decode from "jwt-decode";

import styles from "./../../Styles/login.module.css";
function Signin() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const handleLogin = async (e) => {
    try {
      const body = { user_email: email, user_password: password };
      const response = await fetch("https://35.221.31.78/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        const decoded = jwt_decode(parseRes.jwtToken)
        console.log(decoded)
        dispatch(setIsAuthenticated(true));
        dispatch(setUserName({
          userName:decoded.user.user_name
        }));
        dispatch(
          setInfoMessage({ type: "SUCCESS", msg: "Login Successful!" })
        );
      } else {
        dispatch(setIsAuthenticated(false));
        dispatch(setInfoMessage({ type: "ERROR", msg: parseRes.message }));
        console.error(parseRes);
      }
    } catch (err) {
      dispatch(setInfoMessage({ type: "ERROR", msg: err.message }));
      console.error(err.message);
    }
  };

  return (
    <Form>
      <Form.Group className={` mb-3`} controlId="formBasicEmail">
        <Form.Label className={`${styles["login-label"]}`}>Email address</Form.Label>
        <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className={` mb-3`} controlId="formBasicPassword">
        <Form.Label className={`${styles["login-label"]}`}>Password</Form.Label>
        <Form.Control value = {password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group  className={` mb-3`}>
        <Button className={`${styles["login-button"]}`}  variant="primary" onClick={()=>handleLogin()}>
          Sign In
        </Button>
      </Form.Group>
      <Form.Text>
        Need an Account? <i className={`${styles["login-toggle"]}`} onClick={()=>dispatch(toggleAuth("register"))}>Sign Up!</i>
      </Form.Text>
    </Form>
  );
}

export default Signin;
