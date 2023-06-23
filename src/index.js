import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import CarpoolingReducer from './reducers/CarpoolingReducer';
import SearchForRideReducer from './reducers/SearchForRideReducer';
import thunk from 'redux-thunk';
import RequestRideReducer from './reducers/RequestRideReducer';
import userReducer from './reducers/userReducer';
import driverRequestsReducer from './reducers/request/driverRequestsReducer';
import passengerRequestsReducer from './reducers/request/passengerRequestsReducer';
const rootReducer = combineReducers({
  carpooling: CarpoolingReducer,
  searchForRide: SearchForRideReducer,
  RequestRide:RequestRideReducer,
  user:userReducer,
  driverRequests:driverRequestsReducer,
  passengerRequests:passengerRequestsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const root = document.getElementById('root');
const rootElement = createRoot(root);
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
