import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverInfo = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [driverInfo, setDriverInfo] = useState({
    userId: userId,
    driverLicenseImage: null,
    driverLicenseType: '',
    carType: '',
    carModel: '',
    carCondition: '',
    seatsAvailable: '',
    luggageAvailable: '',
    carInsuranceImage: null ,
  });

  useEffect(() => {
    if (userId) {
      const fetchDriverData = async () => {
        try {
          const driverResponse = await axios.get(`http://localhost:3000/api/getDriver/${userId}`);
          const driverData = driverResponse.data;

          if (driverData) {
            const {
              driverLicenseImage,
              driverLicenseType,
            } = driverData;

            setDriverInfo((prevState) => ({
              ...prevState,
              driverLicenseImage,
              driverLicenseType,
            }));
          }
        } catch (error) {
          console.error(error);
          // Handle error case
        }
      };
     fetchDriverData();
    }
  }, [userId]);
  useEffect(() => {
    if (userId) {
      const fetchDriverData = async () => {
        try {
          // Fetch driver data
          const driverResponse = await axios.get(`http://localhost:3000/api/getDriver/${userId}`);
          const driverData = driverResponse.data;
  
          if (driverData) {
            const { driverLicenseImage, driverLicenseType } = driverData;
  
            setDriverInfo((prevState) => ({
              ...prevState,
              driverLicenseImage,
              driverLicenseType,
            }));
          }
  
          // Fetch car data
          const carHasDriverResponse = await axios.get(`http://localhost:3000/api/carHasDriver/${userId}`);
          const carData = carHasDriverResponse.data.car;
  
          if (carData) {
            const {
              carType,
              carModel,
              carCondition,
              seatsAvailable,
              luggageAvailable,
              carInsuranceImage,
            } = carData;
  
            setDriverInfo((prevState) => ({
              ...prevState,
              carType,
              carModel,
              carCondition,
              seatsAvailable,
              luggageAvailable,
              carInsuranceImage,
            }));
          }
        } catch (error) {
          console.error(error);
          // Handle error case
        }
      };
      fetchDriverData();
    }
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDriverInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (event, name) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDriverInfo((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      alert('You must log in to request a ride.');
      return;
    }

    try {
      // Prepare form data for car
      const carFormData = new FormData();
      carFormData.append('carType', driverInfo.carType);
      carFormData.append('carModel', driverInfo.carModel);
      carFormData.append('carCondition', driverInfo.carCondition);
      carFormData.append('seatsAvailable', driverInfo.seatsAvailable);
      carFormData.append('luggageAvailable', driverInfo.luggageAvailable);
      carFormData.append('carInsuranceImage', event.target.carInsuranceImage.files[0]);

      // Make API call to add the car
      const carResponse = await axios.post('http://localhost:3000/api/addCar', carFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Prepare form data for driver
      const driverFormData = new FormData();
      driverFormData.append('id', driverInfo.userId);
      driverFormData.append('driverLicenseType', driverInfo.driverLicenseType);
      driverFormData.append('driverLicenseImage', event.target.driverLicenseImage.files[0]);

      // Make API call to add the driver
      const driverResponse = await axios.post('http://localhost:3000/api/addDriver', driverFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(carResponse.data); // Log the response from the car API
      console.log(driverResponse.data); // Log the response from the driver API

      // Create carHasDriver entry
      const carId = carResponse.data._id; // Assuming the car response includes the created car's ID
      const carHasDriverData = {
        driverId: driverInfo.userId,
        carId: carId,
      };

      const carHasDriverResponse = await axios.post('http://localhost:3000/api/carhasdrivers', carHasDriverData);

      console.log(carHasDriverResponse.data); // Log the response from the carHasDriver API

      // Redirect to the Publish page
      navigate('/publishRide');
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} className="form-label" style={{ fontSize: '14px', width: '330px' }}>
        <h1>Are you a driver?</h1>
        <div className="mb-3">
          <label htmlFor="driverLicenseImage" className="form-label">
            Driver License Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="driverLicenseImage"
            name="driverLicenseImage"
            onChange={(event) => handleImageChange(event, 'driverLicenseImage')}
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="driverLicenseType" className="form-label">
            Driver License Type:
          </label>
          <select
            className="form-control"
            id="driverLicenseType"
            name="driverLicenseType"
            value={driverInfo.driverLicenseType}
            onChange={handleInputChange}
          >
            <option value="">Select License Type</option>
            <option value="private">Private</option>
            <option value="bus">Bus</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="carType" className="form-label">
            Car Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="carType"
            name="carType"
            value={driverInfo.carType}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="carModel" className="form-label">
            Car Model:
          </label>
          <input
            type="text"
            className="form-control"
            id="carModel"
            name="carModel"
            value={driverInfo.carModel}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="carCondition" className="form-label">
            Car Condition:
          </label>
          <select
            className="form-control"
            id="carCondition"
            name="carCondition"
            value={driverInfo.carCondition}
            onChange={handleInputChange}
          >
            <option value="">Select Car Condition</option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="seatsAvailable" className="form-label">
            Seats Available:
          </label>
          <input
            type="text"
            className="form-control"
            id="seatsAvailable"
            name="seatsAvailable"
            value={driverInfo.seatsAvailable}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="luggageAvailable" className="form-label">
            Luggage Available:
          </label>
          <select
            className="form-control"
            id="luggageAvailable"
            name="luggageAvailable"
            value={driverInfo.luggageAvailable}
            onChange={handleInputChange}
          >
            <option value="">Select Luggage Availability</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="carInsuranceImage" className="form-label">
            Car Insurance Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="carInsuranceImage"
            name="carInsuranceImage"
            onChange={(event) => handleImageChange(event, 'carInsuranceImage')}
          />
        </div>

        <button type="submit" className="btn btn-secondary">
          Add Driver Info
        </button>
      </form>
    </div>
  );
};

export default DriverInfo;
