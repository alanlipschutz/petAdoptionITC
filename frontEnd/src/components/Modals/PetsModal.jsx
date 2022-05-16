import React, { useState } from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Alert from "../Alerts/Alerts";
import Login from "../Login/Login";
import Register from "../Registration/Register";

import "./PetsModal.css";

function PetsModal() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMember, setIsMember] = useState(true);
  const {
    onSignUp,
    onLogIn,
    isAuthLoading,
    showAlert,
    displayAlert,
    showModal,
    onCloseModal,
  } = useAuth();
  const navigate = useNavigate();
  async function handleLogIn() {
    if (!email || !pwd) {
      displayAlert();
      return;
    } else {
      const currentUser = { email, pwd };
      await onLogIn(currentUser);
      navigate("/");
      setEmail("");
      setPwd("");
    }
  }

  async function handleSignUp() {
    if (!name || !lastName || !email || !pwd || !confirmPwd || !phoneNumber) {
      displayAlert();
      return;
    }
    const currentUser = { name, lastName, email, pwd, confirmPwd, phoneNumber };
    await onSignUp(currentUser);
    navigate("/");
    setName("");
    setLastName("");
    setEmail("");
    setPwd("");
    setConfirmPwd("");
    setPhoneNumber("");
  }

  return (
    <>
      <Modal size={!isMember && "lg"} show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isMember ? "Log In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Container>{showAlert && <Alert />}</Container>
        <Modal.Body>
          <p className="c-modal-toggle">
            {isMember ? (
              <>
                Are you not registered?{" "}
                <Button variant="link" onClick={() => setIsMember(false)}>
                  {" "}
                  Sign up here{" "}
                </Button>{" "}
              </>
            ) : (
              <>
                Are you registered?{" "}
                <Button variant="link" onClick={() => setIsMember(true)}>
                  {" "}
                  Log In here{" "}
                </Button>{" "}
              </>
            )}
          </p>
          <Form>
            {isMember ? (
              <Login
                email={email}
                setEmail={(e) => setEmail(e.target.value)}
                pwd={pwd}
                setPwd={(e) => setPwd(e.target.value)}
              />
            ) : (
              <Register
                email={email}
                setEmail={(e) => setEmail(e.target.value)}
                pwd={pwd}
                setPwd={(e) => setPwd(e.target.value)}
                name={name}
                setName={(e) => setName(e.target.value)}
                lastName={lastName}
                setLastName={(e) => setLastName(e.target.value)}
                confirmPwd={confirmPwd}
                setConfirmPwd={(e) => setConfirmPwd(e.target.value)}
                phoneNumber={phoneNumber}
                setPhoneNumber={(e) => setPhoneNumber(e.target.value)}
              />
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={isMember ? handleLogIn : handleSignUp}
            disabled={isAuthLoading}
          >
            {isMember ? "Log In" : "Sign Up"}
            {isAuthLoading && (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PetsModal;
