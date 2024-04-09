import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Country = () => {
  const dispatch = useDispatch();
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const country = useSelector((state) =>
    state.countries.countries.find((country) => country.name.common === name)
  );
  const favourites = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=6165bc8c579eaab143498842bc768692`
      )
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Card className="h-100 w-60">
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
          <Card.Title>
            {country.name.common}
            {favourites.some(
              (favourite) => favourite.name?.common === country.name.common
            ) ? (
              <FavoriteIcon
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={() => dispatch(removeFavourite(country))}
              />
            ) : (
              <FavoriteBorderIcon
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={() => dispatch(addFavourite(country))}
              />
            )}
          </Card.Title>
          <Card.Subtitle className="mb-5 text-muted">
            {country.name.official}
          </Card.Subtitle>
          <ListGroup
            variant="flush"
            className="flex-grow-1 justify-content-end"
          >
            <ListGroup.Item>
              <i className="bi bi-translate me-2"></i>
              Capital : {country.capital[0]}
            </ListGroup.Item>
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
              <ListGroup.Item>
                <Card.Text>
                  {`Weather : ${(weather.main.temp - 273.15).toFixed(
                    1
                  )}°C, humidity ${weather.main.humidity}%, wind ${
                    weather.wind.speed
                  } m/s, `}
                </Card.Text>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Country;
