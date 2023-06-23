import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRequest } from '../actions/requestActions';

const RequestForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRequest(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields for creating a new request */}
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestForm;