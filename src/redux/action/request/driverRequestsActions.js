import axios from 'axios';

export const getAllRides = (userId) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/ridesuser/${userId}`)
      .then((res) => {
        dispatch({
          type: "FETCH_RIDES_SUCCESS",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_RIDES_FAILED",
          payload: error.message,
        });
      });
  };
};

export const acceptRequest = (userId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`http://localhost:3000/api/passengerRides/${userId}`, {
        status: "Approved"
      })
      .then((res) => {
        dispatch({
          type: "ACCEPT_REQUEST",
          payload: userId
        });
        console.log("Accept button clicked");
        console.log("API response:", res); // Use the response data if needed
        resolve(); // Resolve the promise
      })
      .catch((error) => {
        console.error("Error updating request:", error);
        reject(error); // Reject the promise with the error
      });
  });
};

export const declineRequest = (userId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`http://localhost:3000/api/passengerRides/${userId}`, {
        status: "Rejected"
      })
      .then((res) => {
        dispatch({
          type: "DECLINE_REQUEST",
          payload: userId
        });
        console.log("Decline button clicked");
        console.log("API response:", res); // Use the response data if needed
        resolve(); // Resolve the promise
      })
      .catch((error) => {
        console.error("Error updating request:", error);
        reject(error); // Reject the promise with the error
      });
  });
};

export const getAllPassengerForRide = (rideId) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/ridePassenger/${rideId}`)
      .then((res) => {
        dispatch({
          type: "LIST_REQUESTS_SUCCESS",
          payload: res.data,
        });

        // Fetch the statuses for each request
        res.data.forEach((request) => {
          dispatch(getRequestStatus(request.user._id));
        });
      })
      .catch((error) => {
        dispatch({
          type: "LIST_REQUESTS_FAILED",
          payload: error.message,
        });
      });
  };
};

export const getRequestStatus = (userId) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/passengerRides/${userId}`)
      .then((res) => {
        dispatch({
          type: "GET_REQUEST_STATUS_SUCCESS",
          payload: {
            userId,
            status: res.data.status,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_REQUEST_STATUS_FAILED",
          payload: error.message,
        });
      });
  };
};
export const deleteRide = (rideId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/api/deleteRide/${rideId}`)
      .then((res) => {
        dispatch({
          type: "DELETE_RIDE_SUCCESS",
          payload: rideId,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_RIDE_FAILED",
          payload: error.message,
        });
      });
  };
};
export const deleteRequestForRide = (userId, rideId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/api/deletePassengerRide/${userId}/${rideId}`)
      .then((res) => {
        dispatch({
          type: "DELETE_REQUEST_SUCCESS",
          payload: { userId, rideId },
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_REQUEST_FAILED",
          payload: error.message,
        });
      });
  };
};