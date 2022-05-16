import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ItemPet from "../../components/ItemPet/ItemPet.js";
import useAuth from "../../hooks/useAuth.js";

function UserPage() {
  const { onGetUser } = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      const userFetch = await onGetUser(id);
      const { userFound, pets } = userFetch;
      setUser(userFound);
      setUserPets(pets);
      setIsLoading(false);
    }
    fetchUserData();
  }, []);

  return (
    <Container>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Card className="p-cardPet mt-5">
        <Card.Body>
          <Card.Text>
            {user && (
              <>
                <span>Name: {user.name}</span>
                <span>Last Name: {user.lastName}</span>
                <span>Phone Number: {user.phoneNumber}</span>
                <span>email: {user.email}</span>
                <span>Admin: {user.isAdmin ? "true" : "false"}</span>
                <span>Bio: {user.bio}</span>
              </>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <Row className="justify-content-center">
        {userPets &&
          userPets.map((pet) => (
            <Col md={"auto"} lg={"auto"} key={pet._id}>
              <ItemPet pet={pet} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default UserPage;
