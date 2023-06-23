import axios from "axios";

const initialState = {
  passengerRideRequest: [],
};

export const requestRide = (dataToSave) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3000/api/addPassengerRide", dataToSave)
      .then((res) => {
        dispatch({ type: "REQUEST_RIDE", payload: res.data });
      })
      .catch((error) => {
        console.log("Error while adding a REQUEST RIDE", error);
      });
  };
};

const RequestRideReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_RIDE":
      return {
        ...state,
        passengerRideRequest: [...state.passengerRideRequest, action.payload],
      };
    default:
      return state;
  }
};

export default RequestRideReducer;
