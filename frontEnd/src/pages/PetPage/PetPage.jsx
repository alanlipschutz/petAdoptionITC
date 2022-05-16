import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Alert from "../../components/Alerts/Alerts";
import "./PetPage.css";

function PetPage() {
  const {
    activeUser,
    onGetPetById,
    onSavePet,
    isAuthLoading,
    showAlert,
    onDeletePet,
    onOwnPet,
    onReturnPet,
  } = useAuth();
  const [savedPet, setSavedPet] = useState([]);
  const { id } = useParams();
  const [pet, setPet] = useState({});
  useEffect(() => {
    async function fetchPet() {
      const { pet } = await onGetPetById(id);
      setPet(pet);
    }
    fetchPet();
    if (activeUser) {
      const { savedPets } = activeUser;
      setSavedPet(savedPets);
    }
  }, [id, activeUser]);

  async function handleSaveAPet() {
    onSavePet(id);
  }
  async function handleDeletePet() {
    onDeletePet(id);
  }

  async function handleOwnAPet(e) {
    onOwnPet(id, e.target.name);
  }

  async function handleReturnPet() {
    onReturnPet(id);
  }
  let statusStyle;
  if (pet.adoptionStatus === "Available") {
    statusStyle = { backgroundColor: "#D1E7DD" };
  } else {
    statusStyle = { backgroundColor: "#F8D7DA" };
  }

  return (
    <Container>
      <Card className="p-cardPet mt-5">
        <Card.Img variant="top" src={pet.picture} />
        <div className="petInfo">
          <Card.Body>
            <div className="d-flex align-center justify-content-between">
              <span className="display-1">{pet.name}</span>
              <span className="adopt-status" style={statusStyle}>
                {pet.adoptionStatus}
              </span>
            </div>
            <div className="d-flex flex-column mt-3 gap-1">
              <span>Height: {pet.height}</span>
              <span>Weight: {pet.weight}</span>
              <span>Color: {pet.color}</span>
              <span>Hypoallergenic: {pet.hypoallergenic}</span>
              <span>Dietary Restrictions: {pet.dietaryRestrictions}</span>
              <span>Breed: {pet.breed}</span>
            </div>
            {pet.bio && <span>{pet.bio}</span>}
          </Card.Body>

          {activeUser && (
            <Card.Footer className="btn-container">
              <Button
                variant="primary"
                name="Fostered"
                onClick={handleOwnAPet}
                disabled={isAuthLoading}
                className={pet.adoptionStatus === "Available" ? "" : "d-none"}
              >
                {!isAuthLoading ? (
                  "Foster"
                ) : (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </Button>
              <Button
                variant="success"
                name="Adopted"
                onClick={handleOwnAPet}
                disabled={isAuthLoading}
                className={
                  pet.adoptionStatus === "Adopted" ||
                  (pet.adoptionStatus === "Fostered" &&
                    !activeUser.ownedPets.includes(id))
                    ? "d-none"
                    : ""
                }
              >
                {!isAuthLoading ? (
                  "Adopt"
                ) : (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </Button>
              <Button
                variant="danger"
                className={
                  !activeUser.ownedPets.includes(id) ||
                  pet.adoptionStatus === "Available"
                    ? "d-none"
                    : ""
                }
                disabled={isAuthLoading}
                onClick={handleReturnPet}
              >
                {!isAuthLoading ? (
                  "Return"
                ) : (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={
                  !activeUser.savedPets.includes(id)
                    ? handleSaveAPet
                    : handleDeletePet
                }
                disabled={isAuthLoading}
              >
                {!isAuthLoading ? (
                  <span>{!savedPet.includes(id) ? "Save" : "Unsave"}</span>
                ) : (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </Button>
            </Card.Footer>
          )}
        </div>
      </Card>
      {showAlert && (
        <div className="mt-4">
          {" "}
          <Alert />
        </div>
      )}
      {!activeUser && (
        <span className="display-6 mt-4">
          If you want to adopt a pet, please Log In!
        </span>
      )}
    </Container>
  );
}

export default PetPage;
