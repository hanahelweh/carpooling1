import React from 'react';

const DriverRating = ({ driverRate }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= driverRate) {
        stars.push(<i key={i} className="fa fa-star" style={{color:'orange'}}></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star-o" style={{color:'orange'}}></i>);
      }
    }
    return stars;
  };

  return <span className="driver-rating">{renderStars()}</span>;
};

export default DriverRating;
