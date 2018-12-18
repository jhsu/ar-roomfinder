import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";
import * as roomGeolocations from "./roomGeolocations";
import { getVirtualScale } from "./spatialConverter";

import store from "./store";

import Orientation from "./components/Orientation";
import Compass from "./components/Compass";

import Building from './components/Building';
import PortlandOffice from "./components/PortlandOffice";
import Path from './components/Path';

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cameraRef = React.createRef();
  }

  componentDidMount() {
    this.cameraRef.current.addEventListener("componentchanged", evt => {
      if (evt.detail.name !== "position") {
        return;
      }
      this.props.onCameraMove(evt.detail.target.getAttribute("position"));
    });
  }

  render() {
    const {
      error,
      // coords,
      // orientation,
      userPosition,
      initialHeading,
      initialLocation,
      distanceTraveled
    } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        error: {JSON.stringify(error)}<br />
        distanceTraveled: {distanceTraveled}
        <br />
        heading: {initialHeading}
        <br />
        userPosition: {JSON.stringify(userPosition)}
        <br />
        {initialLocation && (
          <div>
            standByMe:{" "}
            {JSON.stringify(
              getVirtualScale(initialLocation, roomGeolocations.STAND_BY_ME)
            )}
            <br />
            Cuckoos Nest:{" "}
            {JSON.stringify(
              getVirtualScale(initialLocation, roomGeolocations.CUCKOOS_NEST)
            )}
            <br />
          </div>
        )}
        roomCoords:
        <br />
        <a-scene ar arjs="trackingMethod: best;">
          <a-assets>
            <img id="portlandfloor" src="./portland.png" />
          </a-assets>
          <a-entity position="0 -2 0">
          <Orientation userOrientation={initialHeading}>
            <Compass />
            {initialLocation && (
              <Building><PortlandOffice /></Building>
            )}
            <Path />
          </Orientation>
          </a-entity>
          <a-entity ref={this.cameraRef} camera="active: true" look-controls wasd-controls position="0 0 0" data-aframe-default-camera></a-entity>
          <a-sky color="#6EBAA7" />
        </a-scene>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onCameraMove: position => {
        return { type: "CAMERA_MOVE", position };
      }
    },
    dispatch
  );
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("app")
);
