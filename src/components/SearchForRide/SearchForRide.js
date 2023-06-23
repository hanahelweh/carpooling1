import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations } from "../../reducers/SearchForRideReducer";
import { searchRide } from "../../reducers/SearchForRideReducer";
import { useNavigate } from "react-router-dom";

const SearchForRide = () => {
  const locations = useSelector((state) => state.searchForRide.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleLocationSelect = (event, setLocation) => {
    const selectedCity = event.target.value;
    setLocation(selectedCity);
  };

  const getLocationId = (city) => {
    const location = locations.find((location) => location.cities === city);
    return location ? location._id : null;
  };

  const handleSearch = () => {
    if (fromLocation && toLocation && selectedDate) {
      const fromLocationId = getLocationId(fromLocation);
      const toLocationId = getLocationId(toLocation);

      if (fromLocationId && toLocationId) {
        dispatch(searchRide(fromLocationId, toLocationId, selectedDate));
        navigate(
          `/searchRide/${fromLocationId}/${toLocationId}?date=${selectedDate}`
        );
      } else {
        console.log("Invalid location selected");
      }
    } else {
      console.log("Please fill in all the fields.");
    }
  };

  return (
    <div className="container" style={{ height: "60px" }}>
      <div className="row h-100">
        <div className="input-group h-100">
          <input
            type="text"
            aria-label="fromLocation"
            className="form-control"
            placeholder="Leaving from.."
            list="fromLocationList"
            value={fromLocation}
            onChange={(e) => handleLocationSelect(e, setFromLocation)}
          />
          <input
            type="text"
            aria-label="toLocation"
            className="form-control"
            placeholder="Going to.."
            list="toLocationList"
            value={toLocation}
            onChange={(e) => handleLocationSelect(e, setToLocation)}
          />
          {locations && locations.length > 0 && (
            <>
              <datalist id="fromLocationList">
                {locations.map((location) => (
                  <option key={location._id} value={location.cities} />
                ))}
              </datalist>
              <datalist id="toLocationList">
                {locations.map((location) => (
                  <option key={location._id} value={location.cities} />
                ))}
              </datalist>
            </>
          )}
          <input
            type="date"
            className="form-control"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-secondary"
            style={{ width: "200px" }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForRide;
