import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SearchBox.css";

function SearchBox({
  getPets,
  type,
  setType,
  height,
  setHeight,
  weight,
  setWeight,
  name,
  setName,
  adoptionStatus,
  setAdoptionStatus,
}) {
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <Form className="c-searchbox" onSubmit={(e) => getPets(e)}>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Select name="type" value={type} onChange={setType}>
          <option>All</option>
          <option>dog</option>
          <option>cat</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          value={isAdvanced}
          onChange={() => setIsAdvanced(!isAdvanced)}
          type="checkbox"
          label="Advanced Search"
        />
      </Form.Group>
      {isAdvanced && (
        <>
          <div className="advancedBox">
            <Form.Group>
              <Form.Label>Heigth</Form.Label>
              <Form.Control
                placeholder="heigth..."
                type="text"
                value={height}
                onChange={setHeight}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weigth</Form.Label>
              <Form.Control
                placeholder="weigth..."
                type="text"
                value={weight}
                onChange={setWeight}
              />
            </Form.Group>
          </div>
          <div className="advancedBox">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="name..."
                type="text"
                value={name}
                onChange={setName}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adoption Status</Form.Label>
              <Form.Select
                name="adoptionStatus"
                value={adoptionStatus}
                onChange={setAdoptionStatus}
              >
                <option>All</option>
                <option>Available</option>
                <option>Fostered</option>
                <option>Adopted</option>
              </Form.Select>
            </Form.Group>
          </div>
        </>
      )}
      <div className="btn-container">
        <Button type="submit" variant="primary">
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchBox;
