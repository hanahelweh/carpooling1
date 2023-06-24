const initialState = {
  rides: [],
  Drequests: [],
};

const driverRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "LIST_REQUESTS_SUCCESS":
      return {
        ...state,
        Drequests: action.payload.map((Drequest) => ({
          ...Drequest,
        })),
        error: null,
      };
    case "LIST_REQUESTS_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    case "ACCEPT_REQUEST":
      return {
        ...state,
        Drequests: state.Drequests.map((Drequest) =>
          Drequest.user._id === action.payload
            ? { ...Drequest, status: "Approved" }
            : Drequest
        ),
      };
    case "DECLINE_REQUEST":
      return {
        ...state,
        Drequests: state.Drequests.map((Drequest) =>
          Drequest.user._id === action.payload
            ? { ...Drequest, status: "Rejected" }
            : Drequest
        ),
      };
    case "DELETE_RIDE_SUCCESS":
      const deletedRideId = action.payload;
      const updatedRides = state.rides.filter(
        (ride) => ride.id !== deletedRideId
      );
      return {
        ...state,
        rides: updatedRides,
      };
      case "DELETE_REQUEST_SUCCESS":
        const deletedRequestId = action.payload;
        const updatedRequests = state.Drequests.filter((Drequest) => Drequest.id !== deletedRequestId);
        return {
          ...state,
          Drequests: updatedRequests,
        };
        case "UPDATE_PASSENGER_RIDE_SUCCESS":
          const updatedRide = action.payload;
          const updatedPassengerRides = state.Drequests.map((Drequest) =>
            Drequest._id === updatedRide._id ? updatedRide : Drequest
          );
          return {
            ...state,
            Drequests: updatedPassengerRides,
          };             
    default:
      return state;
  }
};

export default driverRequestsReducer;
