import React from "react";
import NavBar from "./components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Publish from "./components/Pages/Publish";
import { Contact } from "./components/Pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForRide from "./components/SearchForRide/SearchForRide";
import AvailableRides from "./components/SearchForRide/AvailableRides";
import DriverInfo from "./components/AddRide/DriverInfo";
import Register from './components/authentication/Register';
import 'font-awesome/css/font-awesome.min.css';
import PassengerRequestsPage from "./components/Requests/passengerRequest/passengerRequestPage";
import DriverRequestsPage from "./components/Requests/driverRequest/DriverRequestsPage";
import DriverRidesPage from "./components/Requests/driverRequest/DriverRidesPage";
import Profile from "./components/Pages/Profile";
import Login from "./components/authentication/Login";
function App() {
  return (
    <>
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publish" element={<DriverInfo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/searchForRide" element={<SearchForRide />} />
          <Route
            path="/searchRide/:fromLocationId/:toLocationId"
            element={<AvailableRides />}
          />
          <Route path="/PublishRide" element={<Publish />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/searchRide/:fromLocationId/:toLocationId"
            element={<AvailableRides />}
          />
          <Route path="/driverRidesPage" element={<DriverRidesPage />} />
          <Route path="/driver/requestsFromPassenger/:rideId" element={<DriverRequestsPage/>} />
          <Route path="/passenger/requests" element ={<PassengerRequestsPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;