const initialState = {
  requests: [],
};

const passengerRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_REQUESTS_SUCCESS":
      return state.filter((request) => request.id !== action.payload);
      case "FETCH_REQUESTS_SUCCESS":
        return {
          ...state,
          requests: action.payload,
          error: null,
        };
      case "FETCH_REQUESTS_ERROR":
        return {
          ...state,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default passengerRequestsReducer;
