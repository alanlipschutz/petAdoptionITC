import React, { useEffect, useState } from "react";
import { Container, Form, ListGroup, Spinner } from "react-bootstrap";
import ItemUser from "../../components/ItemPet/ItemUser";
import useAuth from "../../hooks/useAuth";

function GetUsers(props) {
  const [filterUserEmail, setFilterUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { onGetAllUsers, onSelectUser } = useAuth();

  useEffect(() => {
    async function fetchAllUsers() {
      setIsLoading(true);
      const allUsers = await onGetAllUsers();
      setUsers(allUsers);
      setIsLoading(false);
    }
    fetchAllUsers();
  }, []);
  let usersToDisplay = users;
  if (filterUserEmail) {
    usersToDisplay = usersToDisplay.filter((user) =>
      user.email.includes(filterUserEmail)
    );
  }

  return (
    <Container>
      <h1 className="display-4">List Of Users</h1>
      <Container>
        <Form className="mb-4">
          <Form.Control
            placeholder="Email of user"
            type="text"
            value={filterUserEmail}
            onChange={(e) => setFilterUserEmail(e.target.value)}
          />
        </Form>
        {isLoading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <ListGroup as="ol" numbered variant="flush" className="p-listOfPets">
          {usersToDisplay &&
            usersToDisplay.map((user) => (
              <ItemUser
                user={user}
                key={user._id}
                onSelectUser={onSelectUser}
              />
            ))}
        </ListGroup>
      </Container>
    </Container>
  );
}

export default GetUsers;
