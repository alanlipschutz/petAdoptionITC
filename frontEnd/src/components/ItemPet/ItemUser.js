import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ItemPet.css";
function ItemUser({ user }) {
  const navigate = useNavigate();
  return (
    <>
      <ListGroup.Item as="li" className="d-flex align-items-center my-1">
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            ID: {user._id} || EMAIL: {user.email}
          </div>
          <Button variant="primary" onClick={() => navigate(`${user._id}`)}>
            User Information
          </Button>{" "}
        </div>
      </ListGroup.Item>
    </>
  );
}

export default ItemUser;
