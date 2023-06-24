import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRequest,
  getPassengerRide,
} from "../../../redux/action/request/passengerRequestsActions";
import {
  deleteRequestForRide,
} from "../../../redux/action/request/driverRequestsActions";

const PassengerRequestsPage = () => {
  const requests = useSelector((state) => state.passengerRequests.requests);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getPassengerRide(userId));
  }, [dispatch, userId]);

  const handleDelete = (userId, rideId) => {
    if (rideId) {
      dispatch(deleteRequestForRide(userId, rideId));
      window.location.reload();
    }
  };

  return (
    <div className="container mt-4">
      <h1>My Requests</h1>
      {requests && requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="card mb-3">
            <div className="card-body">
              <p className="card-text">
                <strong>From:</strong> {request.ride?.FromLocation?.cities}
              </p>
              <p className="card-text">
                <strong>To:</strong> {request.ride?.ToLocation?.cities}
              </p>
              <p className="card-text">
                <strong>Ride Date:</strong> {request.ride?.rideDate.split("T")[0]}
              </p>
              <p className="card-text">
                <strong>Ride Time:</strong> {request.ride?.rideTime}
              </p>
              <p className="card-text">
                <strong>Estimated Duration:</strong>{" "}
                {request.ride?.estimatedDuration}
              </p>
              <p className="card-text">
                <strong>Status:</strong> {request.status}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(request.user?._id, request.ride?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h5 className="pt-3">No requests available</h5>
      )}
    </div>
  );
};

export default PassengerRequestsPage;
