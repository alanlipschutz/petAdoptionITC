import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import "./MyProfile.css";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/Alerts/Alerts";
function MyProfile(props) {
  const { activeUser, showAlert, displayAlert, onUpdate, isAuthLoading } =
    useAuth();
  const [name, setName] = useState(activeUser?.name);
  const [lastName, setLastName] = useState(activeUser?.lastName);
  const [pwd, setPwd] = useState(activeUser?.pwd);
  const [email, setEmail] = useState(activeUser?.email);
  const [phoneNumber, setPhoneNumber] = useState(activeUser?.phoneNumber);
  const [bio, setBio] = useState(activeUser?.bio);

  let valuesToUpdate = {};
  if (pwd !== "") {
    valuesToUpdate = {
      name,
      lastName,
      pwd,
      email,
      phoneNumber,
      bio,
    };
  } else {
    valuesToUpdate = {
      name,
      lastName,
      email,
      phoneNumber,
      bio,
    };
  }
  function handleUpdate(e) {
    e.preventDefault();
    if (!name || !lastName || !email || !phoneNumber) {
      displayAlert();
      return;
    }
    onUpdate(valuesToUpdate);
  }

  return (
    <Container className="mt-4 p-profile">
      <h1 className="display-5">My Profile</h1>
      <Form className="p-profile" onSubmit={handleUpdate}>
        <Form.Group
          className="mb-3 personalData"
          controlId="exampleForm.ControlInput1"
        >
          <div>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="number"
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            className="textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <div className="btn-container">
          <Button
            variant="primary"
            type="submit"
            disabled={isAuthLoading}
            className="mb-3"
          >
            {!isAuthLoading ? (
              "Save Changes"
            ) : (
              <>
                <span>Saving...</span>
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
        </div>
      </Form>
      {showAlert && <Alert />}
    </Container>
  );
}

export default MyProfile;
