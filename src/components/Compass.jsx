import React from "react";
import propTypes from "prop-types";

export default class Compass extends React.Component {
  static propTypes = {
    heading: 0
  };

  render() {
    const { heading } = this.props;
    const rotation = heading == null ? 0 : heading;
    return (
      <a-entity rotation={`0 ${rotation} 0`}>
        <a-box
          position="0 0 -0.25"
          rotation="0 0 0"
          width="0.1"
          height="0.1"
          depth="0.5"
          color="#dd3016"
        />
        <a-box
          position="0 0 0"
          rotation="0 90 0"
          width="0.1"
          height="0.1"
          depth="1"
          color="#4CC3D9"
        />
        <a-box
          position="0 0 0.25"
          rotation="0 0 0"
          width="0.1"
          height="0.1"
          depth="0.5"
          color="#4CC3D9"
        />
      </a-entity>
    );
  }
}
