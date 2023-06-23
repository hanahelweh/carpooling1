import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { searchRide } from "../../reducers/SearchForRideReducer";
import { Modal, Button } from "react-bootstrap";
import { requestRide } from "../../reducers/RequestRideReducer";
import DriverRating from "../SearchForRide/DriverRating";
import { getPassengerRide } from "../../redux/action/request/passengerRequestsActions";
const AvailableRides = () => {
  const rides = useSelector((state) => state.searchForRide.rides);
  const dispatch = useDispatch();
  const { fromLocationId, toLocationId } = useParams();
  const location = useLocation();
  const selectedDate = new URLSearchParams(location.search).get("date");
  const passengerRequests = useSelector((state) => state.passengerRequests.requests);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    dispatch(searchRide(fromLocationId, toLocationId, selectedDate));
    dispatch(getPassengerRide(userId)); // Fetch passenger requests
  }, [dispatch, fromLocationId, toLocationId, selectedDate, userId]);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [requestedRides, setRequestedRides] = useState([]);
  const [licenseImageModalOpen, setLicenseImageModalOpen] = useState(false);
  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
    setDriverModalOpen(true);
  };
const handleLicenseImageClick = () => {
    setLicenseImageModalOpen(true);
  };

  const handleCloseLicenseImageModal = () => {
    setLicenseImageModalOpen(false);
  };
  const handleRequestClick = (rideId) => {
    if (!passengerRequests) {
      return;
    }
  
    const isRequestSent = passengerRequests.some(
      (request) => request.ride && request.ride._id === rideId && request.user && request.user._id === userId
    );
  
    if (isRequestSent) {
      alert("Request already sent");
      return;
    }
  
    if (userId) {
      const dataToSave = {
        rideId: rideId,
        userId: userId,
      };
      dispatch(requestRide(dataToSave));
      setRequestedRides((prevRequestedRides) => [...prevRequestedRides, rideId]);
      handleCloseModal();
    } else {
      alert("You must log in to request a ride.");
    }
  };
  

  const handleCloseModal = () => {
    setDriverModalOpen(false);
    setSelectedDriver(null);
  };

  return (
    <div className="container-md">
      <h1>Available Rides</h1>
      {rides && rides.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Stops</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col">Driver info</th>
              <th scope="col">Send request</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride, index) => (
              <tr key={ride._id}>
                <th scope="row">{index + 1}</th>
                <td>{ride.FromLocation.cities}</td>
                <td>{ride.ToLocation.cities}</td>
                <td>
                  {ride.locations && ride.locations.length > 0
                    ? ride.locations
                        .map((location) => location.cities)
                        .join(", ")
                    : "-"}
                </td>
                <td>{ride.estimatedDuration}</td>
                <td>{new Date(ride.rideDate).toLocaleDateString()}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDriverClick(ride.user)}
                  >
                    Driver
                  </button>
                </td>
                <td>
                  <button
                    type="submit"
                    className={`btn ${requestedRides.includes(ride._id) ? "btn-success" : "btn-dark"}`}
                    onClick={() => handleRequestClick(ride._id)}
                    disabled={requestedRides.includes(ride._id)}
                  >
                    {requestedRides.includes(ride._id) ? "Requested" : "Request"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="pt-3">No rides available</h5>
      )}


<Modal show={driverModalOpen} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Driver Information</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedDriver && selectedDriver && (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          {selectedDriver.image ? (
            <img src={require("../assets/userProfile"+selectedDriver.image.replace(/\\/g,"/"))} 
            alt="User"
              style={{ width: "200px", height: "200px" }}
              className="rounded d-flex justify-content-center" />
          ) : (
            <img
              src={require("../assets/userProfile/default-user-image.jpg")}
              alt="Default User"
              style={{ width: "200px", height: "200px" }}
              className="rounded d-flex justify-content-center"
            />
          )}
        </div>
        <p>Name: {selectedDriver.fullName}</p>
        <p>
          Date Of Birth:{" "}
          {selectedDriver.dateOfBirth
            ? new Date(selectedDriver.dateOfBirth).toLocaleDateString()
            : ""}
        </p>
        <p>Gender: {selectedDriver.gender}</p>
        <p>Location: {selectedDriver.location}</p>
        <p>Smoking: {selectedDriver.smoking ? "yes" : "No"}</p>
        <p>License Type: {selectedDriver.driver?.driverLicenseType}</p>
        <p>License Image: 
  {selectedDriver.driver?.driverLicenseImage && (
    <a href="#" onClick={(e)=>{e.preventDefault();handleLicenseImageClick();}} target="_blank" rel="noopener noreferrer">View License Image</a>
  )}
</p>
<Modal show={licenseImageModalOpen} onHide={handleCloseLicenseImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Driver License Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDriver.driver?.driverLicenseImage && (
            <img
              src={require("../assets/licenseImage" + selectedDriver.driver.driverLicenseImage.replace(/\\/g, "/"))}
              alt="Driver License Image"
              style={{ width: "100%" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseLicenseImageModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
        <p>
          Driver Rating:{" "}
          <DriverRating driverRate={selectedDriver.driver?.driverRate} />
        </p>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
};

export default AvailableRides;
