import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
function HomePage(props) {
  const { activeUser } = useAuth();
  return (
    <div className="p-homepage">
      <Container>
        {activeUser && (
          <>
            <h3 className="display-5 mt-5">Hello {activeUser.name},</h3>
          </>
        )}
        <h1 className="display-1 mt-5">Welcome to Adopcy! </h1>
        <div className="display-6">
          You are just one step away from giving your love to a new friend{" "}
          <p className="linkToSearch">
            <Link to="/pets"> Search Me here</Link>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
