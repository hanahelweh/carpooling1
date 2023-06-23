const initialState = [];

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return [...state, action.payload];
    case 'EDIT_REQUEST':
      return state.map((request) =>
        request.id === action.payload.id ? { ...request, ...action.payload.updatedData } : request
      );
    case 'DELETE_REQUEST':
      return state.filter((request) => request.id !== action.payload);
    default:
      return state;
  }
};

export default requestReducer;