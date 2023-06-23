import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPassengerForRide,
  acceptRequest,
  declineRequest,
  getRequestStatus,
} from "../../../redux/action/request/driverRequestsActions";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const DriverRequestsPage = () => {
  const Drequests = useSelector((state) => state.driverRequests.Drequests);
  const dispatch = useDispatch();
  const { rideId } = useParams();

  const handleAccept = async (userId) => {
    try {
      await dispatch(acceptRequest(userId));
      console.log("Accept button clicked");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (userId) => {
    try {
      await dispatch(declineRequest(userId));
      console.log("Decline button clicked");
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  useEffect(() => {
    console.log("rideId:", rideId);
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
              {Drequest.status === "Approved" ? (
                <p className="card-text">Status: Approved</p>
              ) : Drequest.status === "Rejected" ? (
                <p className="card-text">Status: Rejected</p>
              ) : (
                <div>
                  <Button
                    variant="success"
                    onClick={() => handleAccept(Drequest.user._id)}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDecline(Drequest.user._id)}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          </div>
      )))
      : (
        <h5 className="pt-3">No requests available</h5>
      )}
    </div>
  );
};

export default DriverRequestsPage;