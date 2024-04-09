import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
          Rest Countries
        </h1>
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
          Rest Countries
        </h1>
        <p style={{ textAlign: "center" }}>
          Get information about countries around the world.
        </p>
        <div>
          <Button
            variant="primary"
            style={{
              display: "block",
              margin: "20px auto",
            }}
          >
            <a
              href="/countries"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              View Countries
            </a>
          </Button>
          <div></div>
        </div>
      </div>
      <img
        src="https://t3.ftcdn.net/jpg/00/93/76/14/240_F_93761497_JjhsPz3ZJ0jl9xfzi1WUViksSzbAStpb.jpg"
        alt="world map"
        style={{
          width: "40%",
          height: "25%",
          display: "block",
          margin: "30px auto",
        }}
      />
    </div>
  );
};

export default Home;
