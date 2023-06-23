import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
    smoking: false,
    dateOfBirth: "",
    gender: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem("userId");

    // Fetch the user's information from the backend
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getUser/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error case
          console.error("Failed to fetch user:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const isRegistered = !!user; // Check if the user exists
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setUpdatedUser({ ...updatedUser, [name]: inputValue });
  };

  const handleEditClick = () => {
    setEditing(true);
    setUpdatedUser(user);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/updateUser/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        setEditing(false);
      } else {
        // Handle error case
        console.error("Failed to update user:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      {!isRegistered && (
        <div>
          <p>
            Are you a user? If not, please <Link to="/register">register here</Link>.
          </p>
        </div>
      )}
      {isRegistered && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">User Profile</h5>
          </div>
          <div className="card-body" style={{ minWidth: "360px" }}>
            {editing ? (
              <>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={updatedUser.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={updatedUser.userName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={updatedUser.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="smoking"
                    name="smoking"
                    checked={updatedUser.smoking}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="smoking" className="form-check-label">
                    Smoking
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={updatedUser.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender:
                  </label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={updatedUser.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={updatedUser.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    profile picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setUpdatedUser({ ...updatedUser, image: file });
                    }}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="card-text d-flex justify-content-center">
                  {user.image && <img src={require("../assets/userProfile" + user.image.replace(/\\/g, "/"))}
                    alt="profile"
                    style={{ width: "200px", height: "200px" }}
                    className="rounded d-flex justify-content-center" />}
                </p>
                <p className="card-text">
                  <strong>Full Name:</strong> {user.fullName}
                </p>
                <p className="card-text">
                  <strong>Username:</strong> {user.userName}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="card-text">
                  <strong>Smoking:</strong> {user.smoking ? "Yes" : "No"}
                </p>
                <p className="card-text">
                  <strong>Date of Birth:</strong> {user.dateOfBirth}
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> {user.gender}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {user.location}
                </p>
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;