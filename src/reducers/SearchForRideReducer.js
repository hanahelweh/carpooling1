import axios from "axios";
const initialState = {
  data: [],
  rides: [],
  error:null,
};
export const fetchLocations = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3000/api/getLocations")
      .then((res) => {
        dispatch({
          type: "FETCH_LOCATIONS_SUCCESS",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_LOCATIONS_ERROR",
          payload: error.message,
        });
      });
  };
};
export const searchRide = (from, to, date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/searchRide/${from}/${to}`, {
        params: { date },
      });

      // Assuming the response data contains the rides
      const rides = response.data.rides;

      // Dispatch an action to update the Redux state with the fetched rides
      dispatch({
        type: "FETCH_RIDES_SUCCESS",
        payload: rides,
      });
    } catch (error) {
      // Handle any errors that occur during the API call
      dispatch({
        type: "FETCH_RIDES_ERROR",
        payload: error.message,
      });
    }
  };
};

const SearchForRideReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LOCATIONS_SUCCESS":
      return {
        ...state,
        data: action.payload,
      };
      case "FETCH_LOCATIONS_ERROR":
        return {
          ...state,
          error: action.payload,
        };
        case "FETCH_RIDES_SUCCESS":
          return {
            ...state,
            rides: action.payload,
            error: null,
          };
        case "FETCH_RIDES_ERROR":
          return {
            ...state,
            error: action.payload,
          };
    default:
      return state;
  }
};
export default SearchForRideReducer;