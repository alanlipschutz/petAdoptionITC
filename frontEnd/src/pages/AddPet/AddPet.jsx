import React, { useRef } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import Alert from "../../components/Alerts/Alerts";
import useAuth from "../../hooks/useAuth";
import "./AddPet.css";

function AddPet(props) {
  const {
    isAuthLoading,
    showAlert,
    displayAlert,
    isEditing,
    typeOptions,
    type,
    name,
    adoptionStatusOptions,
    adoptionStatus,
    height,
    weight,
    color,
    bio,
    hypoallergenicOptions,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    onChangePetInput,
    clearValues,
    onAddPet,
    onEditPet,
  } = useAuth();
  const file = useRef();

  function handleSubmitPet(e) {
    e.preventDefault();
    if (
      !type ||
      !name ||
      !adoptionStatus ||
      !height ||
      !weight ||
      !color ||
      !hypoallergenic ||
      !breed
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      onEditPet(file);
      return;
    }
    onAddPet(file);
  }

  function handlePetInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    onChangePetInput({ name, value });
  }

  function clear() {
    clearValues();
  }

  return (
    <div>
      <Container className="mt-4">
        <h1 className="display-5">{isEditing ? "Edit Pet" : "Add Pet"}</h1>
        {showAlert && <Alert />}
        <Form className="p-addPet">
          <Form.Group className="mb-3">
            <Form.Label>Pet Type</Form.Label>
            <Form.Select name="type" value={type} onChange={handlePetInput}>
              {typeOptions.map((typeOfPet, index) => {
                return (
                  <option key={index} value={typeOfPet}>
                    {typeOfPet}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <div className="same-line">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                onChange={handlePetInput}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adoption Status</Form.Label>
              <Form.Select
                name="adoptionStatus"
                value={adoptionStatus}
                onChange={handlePetInput}
              >
                {adoptionStatusOptions.map((status, index) => {
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              type="file"
              size="sm"
              name="picture"
              ref={file}
              accept="image/*"
            />
          </Form.Group>
          <div className="same-line">
            <Form.Group>
              <Form.Label>Heigth</Form.Label>
              <Form.Control
                name="height"
                value={height}
                onChange={handlePetInput}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                name="weight"
                value={weight}
                onChange={handlePetInput}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color"
                value={color}
                onChange={handlePetInput}
                type="text"
              />
            </Form.Group>
          </div>
          <div className="same-line">
            <Form.Group>
              <Form.Label>Hypoallergenic</Form.Label>
              <Form.Select
                name="hypoallergenic"
                value={hypoallergenic}
                onChange={handlePetInput}
              >
                {hypoallergenicOptions.map((hypo, index) => {
                  return (
                    <option key={index} value={hypo}>
                      {hypo}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Dietary Restrictions</Form.Label>
              <Form.Control
                name="dietaryRestrictions"
                value={dietaryRestrictions}
                onChange={handlePetInput}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Breed</Form.Label>
              <Form.Control
                name="breed"
                value={breed}
                onChange={handlePetInput}
                type="text"
              />
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              name="bio"
              style={{ height: "75px" }}
              value={bio}
              onChange={handlePetInput}
              type="textarea"
            />
          </Form.Group>
          <div className="btn-container mt-4">
            <Button className="mb-3" variant="danger" onClick={clear}>
              Clear
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isAuthLoading}
              className="mb-3"
              onClick={handleSubmitPet}
            >
              {!isAuthLoading ? (
                "Submit Pet"
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
                </>
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default AddPet;
