import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import NumOfPages from "../../components/NumOfPages/NumOfPages";
import PetCard from "../../components/PetCard/PetCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import useAuth from "../../hooks/useAuth.js";
import "./SearchPetPage.css";

function SearchPetPage() {
  const { onGetAllPets } = useAuth();
  const [type, setType] = useState("All");
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("All");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState([]);

  const queries = {
    type,
    height,
    weight,
    adoptionStatus,
    name,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  async function getAllPets(e, wantedPage) {
    e.preventDefault();
    !wantedPage ? setPage(1) : setPage(wantedPage);
    setIsLoading(true);
    const { allPets, totalPets, numOfPages } = await onGetAllPets(
      queries,
      wantedPage
    );
    setPets(allPets);
    setTotal(totalPets);
    setPages(numOfPages);
    setIsLoading(false);
  }

  return (
    <Container className="p-pets">
      <h1 className="display-4 mt-4">Search</h1>
      <SearchBox
        getPets={getAllPets}
        type={type}
        setType={(e) => setType(e.target.value)}
        height={height}
        setHeight={(e) => setHeight(e.target.value)}
        weight={weight}
        setWeight={(e) => setWeight(e.target.value)}
        name={name}
        setName={(e) => setName(e.target.value)}
        adoptionStatus={adoptionStatus}
        setAdoptionStatus={(e) => setAdoptionStatus(e.target.value)}
      />
      {<h2 className="display-6">Pets Found: {total}</h2>}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Row className="mt-3 justify-content-center">
        {pets.map((pet) => (
          <Col key={pet._id} md={"auto"} lg={"auto"} style={{ width: "auto" }}>
            <PetCard pet={pet} />
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

export default SearchPetPage;
