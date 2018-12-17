import React from "react";
import propTypes from "prop-types";
import { getVirtualScale } from "../spatialConverter";

class Room extends React.PureComponent {
  render() {
    const { userLocation, room } = this.props;
    const position = getVirtualScale(userLocation, room);
    return (
      <a-box
        color="#cedfea"
        depth="0.2"
        height="0.2"
        width="0.2"
        position={position}
      />
    );
  }
}

Room.propTypes = {
  userLocation: propTypes.object,
  room: propTypes.object
};

export default Room;
