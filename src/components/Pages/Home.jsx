import React from "react";
import carpoolingImage from "../assets/Carpooling.webp";
import SearchForRide from "../SearchForRide/SearchForRide";
import { Card } from "react-bootstrap";
const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${carpoolingImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    height: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding:"30px",
    paddingTop:"30px"
  };
  const justify = {
    textAlign: "justify",
    maxWidth:"600px"
  }
  return (
    <div className="home-container">
      <div className="hero text-center" style={containerStyle}>
        <h1 className="">
          Welcome to <span className="text-warning fs-1 fw-bolder">Carpooling</span>
        </h1>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}><SearchForRide /></div>
      </div>
      <section className="features my-5">
            <div className="container d-flex align-items-center justify-content-around">
        <div className="row w-100 text-center">
          <div className="col-lg-4 mx-md-10 mb-4 mr-md-4">
            <i className="fa fa-map-marker fa-3x"></i>
            <h3>Convenient</h3>
            <p>Find rides near your location</p>
          </div>
          <div className="col-lg-4 mx-md-10 mb-4 mr-md-4">
            <i className="fa fa-users fa-3x"></i>
            <h3>Social</h3>
            <p>Connect and ride with others</p>
          </div>
          <div className="col-lg-4 mx-md-10 mb-4">
            <i className="fa fa-money fa-3x"></i>
            <h3>Affordable</h3>
            <p>Save money on transportation</p>
          </div>
        </div>
      </div>

      </section>
      <section className="mt-5">
        <div className="container d-flex align-items-center">
          <p style={justify}>
          A <soan className="text-danger fw-bolder">CARPOOLING</soan> website is an online platform that facilitates the sharing of rides among individuals who are traveling in the same direction. It connects drivers who have available seats in their vehicles with passengers who are heading in the same direction and are in need of a ride. The main purpose of a carpooling website is to promote cost-sharing, reduce traffic congestion, and minimize the environmental impact caused by individual vehicles.
          On a carpooling website, users can create profiles, search for available rides, and request to join a carpool. The website typically provides features such as search filters to find rides based on specific criteria like the starting point, destination, date, and time. Users can view the details of available rides, including the driver's profile, vehicle information, and any additional requirements or preferences set by the driver.
          </p>
          <img src={require("../assets/Carpooling.png")} className="w-50 h-50"></img>
        </div>
      </section>
      <section className="how-it-works text-center">
        <div className="container">
          <h2>How It Works</h2>
          <div className="row">
            <Card className="col-lg-4">
              <div className="step">
                <div className="step-icon">1</div>
                <p>Search for available rides or offer your own</p>
              </div>
            </Card>
            <Card className="col-lg-4">
              <div className="step">
                <div className="step-icon">2</div>
                <p>Connect with drivers or passengers</p>
              </div>
            </Card>
            <Card className="col-lg-4">
              <div className="step">
                <div className="step-icon">3</div>
                <p>Coordinate pickup and drop-off details</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <footer className="text-center mt-5 bg-black text-white" style={{ height: "50px" }}>
        <div className="container">
          <p className="pt-3">&copy; 2023 Carpooling. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
