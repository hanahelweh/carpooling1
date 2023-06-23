export const createRequest = (requestData) => ({
    type: 'CREATE_REQUEST',
    payload: requestData,
  });
  
  export const editRequest = (requestId, updatedData) => ({
    type: 'EDIT_REQUEST',
    payload: { id: requestId, updatedData },
  });
  
  export const deleteRequest = (requestId) => ({
    type: 'DELETE_REQUEST',
    payload: requestId,
  });