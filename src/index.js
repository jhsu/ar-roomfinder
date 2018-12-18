import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { onCameraMove, onSelectRoom } from "./actions";
import Building from "./components/Building";
import Compass from "./components/Compass";
import Orientation from "./components/Orientation";
import Path from "./components/Path";
import SelectRoomModel from "./components/SelectRoomModel";
import store from "./store";
import "./style.css";
import 'lucid-ui/dist/index.css';

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
      orientation,
      userPosition,
      initialHeading,
      initialLocation,
      distanceTraveled,
      targetRoomName,
      onSelectRoom
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
        targetRoomName: {targetRoomName}
        <br />
        <SelectRoomModel isOpen={!targetRoomName} onSelect={onSelectRoom} />
        <a-scene ar arjs="trackingMethod: best;">
          <a-assets>
            <img id="portlandfloor" src="./portland.png" />
          </a-assets>
          <a-entity position="0 -2 0">
          <Orientation userOrientation={initialHeading}>
            {initialLocation && (
              <Building targetRoomName={targetRoomName} heading={initialHeading}>
                <Compass />
              </Building>
            )}
            <Path />
          </Orientation>
          </a-entity>
          <a-entity ref={this.cameraRef} camera="active: true" look-controls wasd-controls position="0 0 0" data-aframe-default-camera>
              <a-box position="0 0.1 -2" width="0.1" height="0.1" depth="0.1" color="#f48042"/>
          </a-entity>
          <a-sky color="#6EBAA7" />
        </a-scene>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

const mapDispatchToProps = {
  onCameraMove,
  onSelectRoom,
};

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
