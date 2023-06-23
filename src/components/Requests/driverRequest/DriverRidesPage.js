import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRides } from "../../../redux/action/request/driverRequestsActions";
import {useNavigate } from "react-router-dom";
import {deleteRide} from "../../../redux/action/request/driverRequestsActions";
const DriverRidesPage = () => {
  const rides = useSelector((state) => state.driverRequests.rides);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    dispatch(getAllRides(userId));
  }, [dispatch, userId]);

  const handleRequestsPage = (rideId) => {
    navigate(`/driver/requestsFromPassenger/${rideId}`); // Navigate to the request page with the specific rideId
  };
  const handleDeleteRide = (rideId)=>{
    dispatch(deleteRide(rideId));
    window.location.reload();
  }
  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Rides</h1>
      {rides && rides.length > 0? (
      rides.map((ride) => (
        <div key={ride._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">Date: {ride.rideDate}</p>
            <p className="card-text">Time: {ride.rideTime}</p>
            <p className="card-text">From: {ride.FromLocation.cities}</p>
            <p className="card-text">To: {ride.ToLocation.cities}</p>
            <p className="card-text">Estimated Duration: {ride.estimatedDuration}</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleRequestsPage(ride._id)}
            >
              Requester Details
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteRide(ride._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))):(
        <h5>You haven't publish any ride!</h5>
      )}
    </div>
  );
};

export default DriverRidesPage;
