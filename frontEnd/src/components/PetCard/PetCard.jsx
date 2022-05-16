import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PetCard.css";

// { pet }

function PetCard({ pet }) {
  const navigate = useNavigate();
  return (
    <Card className="c-petCard mt-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={pet.picture} />
      <Card.Body>
        <Card.Title>{pet.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{pet.adoptionStatus}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button onClick={() => navigate(`/pets/${pet._id}`)} variant="primary">
          See More...
        </Button>
      </Card.Body>
    </Card>
  );
}
// onClick={() => navigate("/actors/" + actor.id)

export default PetCard;
