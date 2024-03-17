import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Country = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const country = useSelector((state) =>
    state.countries.countries.find((country) => country.name.common === name)
  );

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=6165bc8c579eaab143498842bc768692`
      )
      .then((response) => {
        setWeather(response.data.main);
        setLoading(false);
      });
  }, [weather]);

  return (
    <Container>
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
          <FavoriteIcon
            color="red"
            onClick={() => dispatch(addFavourite(country))}
          />
          <Card.Title>{country.name.common}</Card.Title>
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

          {loading ? (
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
          ) : (
            <Card.Text>
              Temperature: {(weather.temp - 273.15).toFixed(1)} degrees
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Country;
