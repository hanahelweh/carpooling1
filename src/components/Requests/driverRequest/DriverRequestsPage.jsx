import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPassengerForRide,
  getRequestStatus,
  updatePassengerRideStatus,
} from "../../../redux/action/request/driverRequestsActions";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const DriverRequestsPage = () => {
  const Drequests = useSelector((state) => state.driverRequests.Drequests);
  const dispatch = useDispatch();
  const { rideId } = useParams();
  useEffect(() => {
    if (rideId) {
      dispatch(getAllPassengerForRide(rideId));
    }
  }, [dispatch, rideId]);

  useEffect(() => {
    // Fetch the statuses when Drequests change
    Drequests.forEach((request) => {
      dispatch(getRequestStatus(request.user._id));
    });
  }, [dispatch, Drequests]);
  
  const handleUpdateStatus = async (rideId, userId, status) => {
    try {
      await dispatch(updatePassengerRideStatus(rideId, userId, status));
      dispatch(getAllPassengerForRide(rideId));
    } catch (error) {
      console.error("Error updating passenger ride status:", error);
    }
  };
  useEffect(() => {
    console.log(Drequests); // Display Drequests in the console
  }, [Drequests]);
  return (
    <div className="container mt-4">
      <h1>All Requests</h1>
      {Drequests && Drequests.length > 0 ? (
        Drequests.map((Drequest) => (
          <div key={Drequest._id} className="card mb-3">
            <div className="card-body">
              <p className="card-text">
                <strong>Passenger:</strong> {Drequest.user.fullName}
              </p>
              <p className="card-text">
                <strong>Smoking:</strong> {Drequest.user.smoking.toString()}
              </p>
              <p className="card-text">
                <strong>Date of birth:</strong> {Drequest.user.dateOfBirth}
              </p>
              <p className="card-text">
                <strong>Gender:</strong> {Drequest.user.gender}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {Drequest.user.location}
              </p>
              {Drequest.status === "Pending" ? (
                <div>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleUpdateStatus(Drequest.ride._id, Drequest.user._id, "Approved")
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      handleUpdateStatus(Drequest.ride._id, Drequest.user._id, "Rejected")
                    }
                  >
                    Decline
                  </Button>
                </div>
              ) : (
                <p className="card-footer">Status: {Drequest.status}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <h5 className="pt-3">No requests available</h5>
      )}
    </div>
  );
};

export default DriverRequestsPage;
