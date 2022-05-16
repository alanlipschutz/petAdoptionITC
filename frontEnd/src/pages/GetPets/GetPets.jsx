import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ItemPet from "../../components/ItemPet/ItemPet.js";
import NumOfPages from "../../components/NumOfPages/NumOfPages.js";
import useAuth from "../../hooks/useAuth.js";
import "./GetPets.css";
function GetPets() {
  const { onGetAllPets } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    getAllPets();
  }, []);

  async function getAllPets(e, wantedPage) {
    !wantedPage ? setPage(1) : setPage(wantedPage);
    setIsLoading(true);
    window.scrollTo(0, 0);
    const { allPets, totalPets, numOfPages } = await onGetAllPets(
      {},
      wantedPage
    );
    setPets(allPets);
    setPages(numOfPages);
    setIsLoading(false);
  }

  return (
    <Container>
      <h1 className="display-4">List Of Pets</h1>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Row className="justify-content-center">
        {pets &&
          pets.map((pet) => (
            <Col
              md={"auto"}
              lg={"auto"}
              key={pet._id}
              style={{ width: "auto" }}
            >
              <ItemPet pet={pet} />
            </Col>
          ))}
      </Row>
      {pages > 1 && (
        <div className="d-flex justify-content-center mt-2">
          <NumOfPages pages={pages} page={page} onGetPets={getAllPets} />
        </div>
      )}
    </Container>
  );
}

export default GetPets;
