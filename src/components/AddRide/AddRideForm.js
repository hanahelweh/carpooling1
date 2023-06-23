import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../reducers/SearchForRideReducer';
const AddRideForm = () => {
  const userId = localStorage.getItem('userId');
  const [rideData, setRideData] = useState({
    driverId: userId,
    rideDate: '',
    rideTime: '',
    FromLocation: '',
    ToLocation: '',
    estimatedDuration: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.searchForRide); // Get the locations from the Redux state

  useEffect(() => {
    dispatch(fetchLocations()); // Fetch the locations when the component mounts
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRideData({ ...rideData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/addRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        // Ride added successfully
        const ride = await response.json();
        console.log('Ride added:', ride);
        // Display success message
        alert('Ride added successfully!');
        // Navigate back to the home page
        navigate('/');
      } else {
        // Error adding ride
        const error = await response.json();
        console.error('Error adding ride:', error.message);
        // Do something with the error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error adding ride:', error);
      // Handle any network or server errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-label" style={{ fontSize: '14px', width: '330px'}}>
      <div className="mb-3">
        <label htmlFor="rideDate" className="form-label">
          Ride Date:
        </label>
        <input
          type="date"
          className="form-control"
          id="rideDate"
          name="rideDate"
          value={rideData.rideDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rideTime" className="form-label">
          Ride Time:
        </label>
        <input
          type="time"
          className="form-control"
          id="rideTime"
          name="rideTime"
          value={rideData.rideTime}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="FromLocation" className="form-label">
          From Location:
        </label>
        <select
          className="form-control"
          id="FromLocation"
          name="FromLocation"
          value={rideData.FromLocation}
          onChange={handleInputChange}
        >
          <option value="">Select From Location</option>
          {data.map((location) => (
            <option key={location._id} value={location.cities}>
              {location.cities}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="ToLocation" className="form-label">
          To Location:
        </label>
        <select
          className="form-control"
          id="ToLocation"
          name="ToLocation"
          value={rideData.ToLocation}
          onChange={handleInputChange}
        >
          <option value="">Select To Location</option>
          {data.map((location) => (
            <option key={location._id} value={location.cities}>
              {location.cities}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="estimatedDuration" className="form-label">
          Estimated Duration (in hours):
        </label>
        <input
          type="Number"
          step={0.1}
          className="form-control"
          id="estimatedDuration"
          name="estimatedDuration"
          value={rideData.estimatedDuration}
          onChange={handleInputChange}
        />
        <small className="form-text text-muted">
          Please enter the estimated duration of the ride in hours (e.g., 1.5, 2.75).
        </small>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Ride
      </button>
    </form>
  );
};

export default AddRideForm;
