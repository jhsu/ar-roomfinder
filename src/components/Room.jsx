import React from "react";
import propTypes from "prop-types";

class Room extends React.PureComponent {
  static propTypes = {
    width: propTypes.number,
    height: propTypes.number,
    x: propTypes.number,
    y: propTypes.number,
  };

  static defaultProps = {
    width: 3,
    height: 3,
  };

  render() {
    const { id, x, y, width, height } = this.props;
    return (
      <a-plane
        id={id}
        color="#cedfea"
        height={`${height}`}
        width={`${width}`}
        position={`${x} 0 ${y}`}
        rotation="-90 0 0"
      />
    );
  }
}

Room.propTypes = {
  userLocation: propTypes.object,
  room: propTypes.object
};

export default Room;
