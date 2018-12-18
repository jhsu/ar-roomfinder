import React from "react";

export default class Compass extends React.Component {
  render() {
    return (
      <a-entity>
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
