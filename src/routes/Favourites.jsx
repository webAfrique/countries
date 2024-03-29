import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../auth/firebase";
import {
  getFavourites,
  removeFavourite,
  clearFavourites,
} from "../store/favouritesSlice";
import { getFavouritesFromDb } from "../auth/firebase";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Favourites = () => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    if (favourites.length > 0) return;
    // Get the user's favourites from the database if they are not already in the store
    const user = auth.currentUser;
    if (user) {
      getFavouritesFromDb(user.uid).then((favourites) => {
        dispatch(getFavourites(favourites));
      });
    }
  }, [dispatch]);

  return (
    <Container fluid>
      {favourites.length > 0 && (
        <Button onClick={() => dispatch(clearFavourites())}>Clear All</Button>
      )}
      <Row xs={2} md={3} lg={4} className=" g-3">
        {favourites.length === 0 ? (
          <Col className="text-center m-5">
            <h1>No favourites yet!</h1>
          </Col>
        ) : (
          <>
            {favourites.map((country) => (
              <Col key={country.name.official} className="mt-5">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    className="rounded h-50"
                    src={country.flags.svg}
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />

                  <FavoriteIcon
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(removeFavourite(country))}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Link to={`/countries/${country.name.common}`}>
                      <Card.Title>{country.name.common}</Card.Title>
                    </Link>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.region}
                    </Card.Subtitle>
                    <ListGroup className="mt-auto">
                      <ListGroup.Item>
                        <strong>Population:</strong> {country.population}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Area:</strong> {country.area} km<sup>2</sup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Languages:</strong>{" "}
                        {Object.values(country.languages).join(", ")}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default Favourites;
