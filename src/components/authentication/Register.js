import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
    smoking: false,
    dateOfBirth: "",
    gender: "",
    location: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password, email } = formData;
    const errors = {};

    if (userName.includes(" ")) {
      errors.userName = "Username should not contain spaces.";
    }

    if (password.length < 8) {
      errors.password = "Password should be at least 8 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const url = "http://localhost:3000/api/addUser";
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const fd = new FormData();
      for (const key in formData) {
        fd.append(key, formData[key]);
      }

      const res = await axios.post(url, fd, config);
      console.log(res.data); // Handle the response data as needed

      // Display an alert and navigate to the home page
      alert("User added successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} className="form-label" style={{ fontSize: '14px', width: "330px" }}>
        <h1>Register</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          {errors.userName && <p className="error" style={{ color: 'red' }}>{errors.userName}</p>}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {errors.password && <p className="error" style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <p className="error" style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="smoking"
            checked={formData.smoking}
            onChange={() =>
              setFormData({ ...formData, smoking: !formData.smoking })
            }
          />
          <label className="form-check-label">Smoking</label>
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="Date of Birth"
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="female">Male</option>
            <option value="male">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" name="image" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Register;