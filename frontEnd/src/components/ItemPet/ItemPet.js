import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import "./ItemPet.css";

function ItemPet({ pet }) {
  const navigate = useNavigate();
  const { setEditPet } = useAuth();

  function handleEditButton() {
    navigate("/admin/addpet");
    setEditPet(pet._id);
  }
  return (
    <>
      <Card className="c-petCard mt-3" style={{ width: "19rem" }}>
        <Card.Img variant="top" src={pet.picture} />
        <Card.Body>
          <Card.Title>
            <p>{pet.name}</p>
            <p>{pet._id}</p>
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{pet.adoptionStatus}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button onClick={() => handleEditButton()} variant="primary">
            Edit Pet{" "}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ItemPet;
