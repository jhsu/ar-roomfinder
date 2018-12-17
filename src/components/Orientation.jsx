import React from "react";
import propTypes from "prop-types";

class Orientation extends React.Component {
  render() {
    const { userOrientation = 0, children } = this.props;
    // orient north to 0
    const yRotation = userOrientation;

    return <a-entity rotation={`0 ${yRotation} 0`}>{children}</a-entity>;
  }
}

Orientation.propTypes = {
  userOrientation: propTypes.number,
  userLocation: propTypes.shape({
    latitude: propTypes.number,
    longitude: propTypes.number
  })
};

export default Orientation;
