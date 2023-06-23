import axios from "axios";

export const getPassengerRide = (userId) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/passengerRides/${userId}`)
      .then((res) => {
        dispatch({
          type: "FETCH_REQUESTS_SUCCESS",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_REQUESTS_ERROR",
          payload: error.message,
        });
      });
  };
};

export const deleteRequest = (userId,rideId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/api/deletePassengerRide/${userId}/${rideId}`)
      .then((res) => {
        dispatch({
          type: "DELETE_REQUESTS_SUCCESS",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_REQUESTS_ERROR",
          payload: error.message,
        });
      });
  };
};
