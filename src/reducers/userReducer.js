import axios from "axios";

// Action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

// Action creators
const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersError = (error) => ({
  type: FETCH_USERS_ERROR,
  payload: error,
});

// Thunk action to fetch users from the API
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("http://localhost:3000/api/getUsers")
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error.message));
      });
  };
};

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
