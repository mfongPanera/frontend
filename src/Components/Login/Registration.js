import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleAuth, setInfoMessage } from "../../app/uiReducer";
import { setIsAuthenticated } from "../../app/dataReducer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import jwt_decode from "jwt-decode";

import styles from "./../../Styles/login.module.css";
function Registration() {
  const [infoLabel, setInfoLabel] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [username, setUsername] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [storeName, setStoreName] = useState("");

  const infoMessage = useSelector((state)=>state.uiReducer.infoMessage);
  const storeIdMap = {
    "Panera Bread": "Panera",
    "Chick-fil-A": "Chickfila",
    "Union Pizza": "UnionPizza",
    "Maryland Dairy": "MarylandDairy",
    "Coffee Bar": "CoffeeBar",
    Subway: "Subway",
  };
  const dispatch = useDispatch();

  const handleRegister = async () => {
    // e.preventDefault();
    try {
      const body = {
        user_email: email,
        user_password: password,
        user_name: username,
        supervisor_name: supervisor,
        store_name: storeName,
        store_id: storeIdMap[storeName],
      };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        // const decoded = jwt_decode(parseRes.token);
        dispatch(setIsAuthenticated(true));
        // dispatch(setUserDetails(decoded.user));
        dispatch(
          setInfoMessage({
            type: "SUCCESS",
            msg: "Registration Successful!",
          })
        );
      } else {
        dispatch(setIsAuthenticated(false));
        dispatch(setInfoMessage({ type: "ERROR", msg: parseRes.message }));
        console.error(parseRes.message);
      }
    } catch (err) {
      // const error = err.json()
      dispatch(setInfoMessage({ type: "ERROR", msg: err.message }));
      console.error(err.message);
    }
  };

  function validateForm() {
    if (!email && !password && !confPassword) {
      setInfoLabel("");
      return;
    }
    if (email.length == 0) {
      setInfoLabel({ type: "error", value: "Email cannot be left empty!" });
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setInfoLabel({ type: "error", value: "Email format is incorrect" });
      return;
    }
    if (password.length < 8) {
      setInfoLabel({
        type: "error",
        value: "Password needs to be a minimum of 8 characters!",
      });
      return;
    }
    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;
    let countSpecialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes(password[i])) {
        // this means that the character is special, so increment countSpecialCharacters
        countSpecialCharacters++;
      } else if (!isNaN(password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++;
      } else {
        if (password[i] == password[i].toUpperCase()) {
          // this means that the character is an upper case character, so increment countUpperCase
          countUpperCase++;
        }
        if (password[i] == password[i].toLowerCase()) {
          // this means that the character is lowercase, so increment countUpperCase
          countLowerCase++;
        }
      }
    }

    if (countLowerCase == 0) {
      // invalid form, 0 lowercase characters
      setInfoLabel({
        type: "error",
        value: "Invalid Form, 0 lower case characters in password",
      });
      return;
    }

    if (countUpperCase == 0) {
      // invalid form, 0 upper case characters
      setInfoLabel({
        type: "error",
        value: "Invalid Form, 0 upper case characters in password",
      });
      return;
    }

    if (countDigit == 0) {
      // invalid form, 0 digit characters
      setInfoLabel({
        type: "error",
        value: "Invalid Form, 0 digit characters in password",
      });
      return;
    }

    if (countSpecialCharacters == 0) {
      // invalid form, 0 special characters characters
      setInfoLabel({
        type: "error",
        value: "Invalid Form, 0 special characters in password",
      });
      return;
    }
    if (password !== confPassword) {
      // invalid form, 0 special characters characters
      setInfoLabel({ type: "error", value: "Passwords mismatch" });
      return;
    }
    if (!username) {
      setInfoLabel({ type: "error", value: "Username Empty" });
      return;
    }

    if (!supervisor) {
      setInfoLabel({ type: "error", value: "Select Supervisor" });
      return;
    }
    if (!storeName) {
      setInfoLabel({ type: "error", value: "Select store" });
      return;
    }
    setInfoLabel({ type: "success", value: "All good, register!" });
  }
  useEffect(() => {
    validateForm();
  }, [email, password, confPassword, username, storeName, supervisor]);
  return (
    <Form>
      <Form.Group className={` mb-2`} controlId="formBasicEmail">
        <Form.Label className={`${styles["login-label"]}`}>
          Email address
        </Form.Label>
        <Form.Control
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={` mb-2`} controlId="formBasicPassword">
        <Form.Label className={`${styles["login-label"]}`}>Password</Form.Label>
        <Form.Control
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={` mb-2`} controlId="formBasicPassword">
        <Form.Label className={`${styles["login-label"]}`}>
          Confirm Password
        </Form.Label>
        <Form.Control
          value={confPassword}
          type="password"
          placeholder="Re-enter Password"
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={` mb-2`} controlId="formBasicPassword">
        <Form.Label className={`${styles["login-label"]}`}>Username</Form.Label>
        <Form.Control
          value={username}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={` mb-2`} controlId="formBasicPassword">
        <Form.Label className={`${styles["login-label"]}`}>
          Supervisor
        </Form.Label>
        <Form.Select
          value={supervisor}
          aria-label="Default select example"
          onChange={(e) => setSupervisor(e.target.value)}
        >
          <option>Select Supervisor</option>
          <option value="May">May Fong</option>
          <option value="Denise">Denise</option>
          <option value="Dan">Dan</option>
          <option value="Kevin">Kevin</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={` mb-1`} controlId="formBasicPassword">
        <Form.Label className={`${styles["login-label"]}`}>Store</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        >
          <option>Select Store</option>
          <option value="Panera Bread">Panera Bread</option>
          <option value="Chick-=fil-A">Chick-fil-A</option>
          <option value="Union Pizza">Union Pizza</option>
          <option value="Maryland Diary">Maryland Dairy</option>
          <option value="Subway">Subway</option>
          <option value="Coffee Bar">Coffee Bar</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-1">
        <Form.Text className={`${styles[`login-info-${infoLabel.type}`]} `}>
          {infoLabel.value}
        </Form.Text>
      </Form.Group>
      <Form.Group className={` me-1`}>
        <Button
          disabled={
            infoLabel ? (infoLabel.type == "error" ? true : false) : true
          }
          className={`${styles["login-button"]}`}
          variant="primary"
          onClick={() => handleRegister()}
        >
          Sign Up!
        </Button>
      </Form.Group>
      <Form.Text>
        Already Have an Account?{" "}
        <i
          className={`${styles["login-toggle"]}`}
          onClick={() => {
            dispatch(toggleAuth("login"));
          }}
        >
          Sign In!
        </i>
      </Form.Text>
    </Form>
  );
}

export default Registration;
