import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";
import * as roomGeolocations from "./roomGeolocations";
import { getVirtualScale } from "./spatialConverter";

import store from "./store";

import Orientation from "./components/Orientation";
import Room from "./components/Room";
import Compass from "./components/Compass";
import Path from "./c oromponents/Path.jsx";
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
      coords,
      orientation,
      userPosition,
      initialHeading,
      initialLocation
    } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <br />
        <br />
        <br />
        <br />
        heading: {orientation && orientation.webkitCompassHeading}
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
          <Orientation userLocation={initialLocation}>
            <Compass heading={initialHeading} />{" "}
            <a-box
              className="north box"
              width="0.25"
              height="0.25"
              depth="0.25"
              position="0 0 -10"
              rotation="0 45 0"
              color="#000000"
            />
            {initialLocation && (
              <a-entity>
                <Room
                  room={roomGeolocations.STAND_BY_ME}
                  userLocation={initialLocation}
                />
                <Room
                  room={roomGeolocations.CUCKOOS_NEST}
                  userLocation={initialLocation}
                />
              </a-entity>
            )}
          </Orientation>
          <Path />
          <a-camera ref={this.cameraRef} />
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
