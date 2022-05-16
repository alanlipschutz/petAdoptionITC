import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import PetCard from "../../components/PetCard/PetCard.jsx";

function MyPets(props) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { onGetsMyPets } = useAuth();

  useEffect(() => {
    async function handleGetPetsOfId(e) {
      setPets([]);
      setIsLoading(true);
      let request;
      !toggle
        ? (request = { requestedPet: "ownedPets" })
        : (request = { requestedPet: "savedPets" });
      const fetchPets = await onGetsMyPets(request);
      setPets(fetchPets);
      setIsLoading(false);
    }
    handleGetPetsOfId();
  }, [toggle]);
  return (
    <Container>
      <Button
        variant="link"
        name={!toggle ? "ownedPets" : "savedPets"}
        onClick={() => setToggle(!toggle)}
      >
        {!toggle ? "Saved Pets" : "Owned Pets"}
      </Button>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!isLoading && pets.length === 0 ? (
        <h2 className="display-4">
          {!toggle
            ? "You currently do not own or foster any pets"
            : "You currently do not have any pets saved"}
        </h2>
      ) : (
        <>
          {!isLoading && (
            <h2 className="display-3">
              {!toggle ? "Owned Pets" : "Saved Pets"}
            </h2>
          )}
          <Row className="my-5 justify-content-center">
            {pets.map((pet) => (
              <Col
                key={pet._id}
                md={"auto"}
                lg={"auto"}
                style={{ width: "auto" }}
              >
                <PetCard pet={pet} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default MyPets;
