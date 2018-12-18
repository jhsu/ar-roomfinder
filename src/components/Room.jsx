import React from "react";
import PropTypes from "prop-types";

class Room extends React.PureComponent {
  render() {
    const { id, x, y, width, height } = this.props;
    return (
      <a-box
        id={id}
        color="#cedfea"
        height={`${height}`}
        width={`${width}`}
        depth={'2'}
        position={`${x} 1 ${y}`}
        rotation="-90 0 0"
      />
    );
  }
}

Room.defaultProps = {
  width: 3,
  height: 3,
  x: 0,
  y: 0
};

Room.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Room;
