import React from "react";
import { Form } from "react-bootstrap";
import "./Register.css";

function Register({
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  pwd,
  setPwd,
  confirmPwd,
  setConfirmPwd,
  phoneNumber,
  setPhoneNumber,
}) {
  return (
    <>
      <Form.Group
        className="mb-3 personalData"
        controlId="exampleForm.ControlInput1"
      >
        <div>
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={setName} type="text" />
        </div>
        <div>
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={lastName} onChange={setLastName} type="text" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={setEmail} type="email" />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control value={pwd} onChange={setPwd} type="password" />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          value={confirmPwd}
          onChange={setConfirmPwd}
          type="password"
        />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          value={phoneNumber}
          onChange={setPhoneNumber}
          type="string"
        />
      </Form.Group>
    </>
  );
}

export default Register;
