import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { auth } from "../auth/firebase";
import { getFavourites } from "../store/favouritesSlice";
import { getFavouritesFromDb } from "../auth/firebase";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const favourites = useSelector((state) => state.favourites.favourites);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
    const user = auth.currentUser;
    if (user) {
      getFavouritesFromDb(user.uid).then((favourites) => {
        dispatch(getFavourites(favourites));
      });
    }
  }, [dispatch]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Form.Control
          style={{ width: "18rem", margin: "100px 0 10px 10px" }}
          type="search"
          className="me-2 "
          placeholder="Search countries"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
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
                <Card.Body className="d-flex flex-column">
                  {favourites.some(
                    (favourite) =>
                      favourite.name?.common === country.name.common
                  ) ? (
                    <FavoriteIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(removeFavourite(country))}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(addFavourite(country))}
                    />
                  )}
                  <Link to={`/countries/${country.name.common}`}>
                    <Card.Title>{country.name.common}</Card.Title>
                  </Link>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
