import React from 'react';
import AddRideForm from '../AddRide/AddRideForm';

const Publish = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ maxWidth: '500px' }}>
        <h1>Publish Your Ride</h1>
        <AddRideForm />
      </div>
    </div>
  );
};

export default Publish;
